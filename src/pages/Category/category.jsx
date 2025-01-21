import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "./category.css";
import Navbar from "../../components/Navbar/Navbar";

const categories = [
  "Workshop",
  "Seminar",
  "Conference",
  "Webinar",
  "Meetup",
  "Others",
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Default category
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://kevent-server.onrender.com/events/eventsByCategory?category=${selectedCategory.toLowerCase()}`
        );
        const data = await response.json();

        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [selectedCategory]);

  return (
    <div>
        <Navbar />
    <div className="category-header">
  <h1>Events by Category</h1>

  {/* Enhanced Dropdown */}
  <div className="category-dropdown">
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
</div>


      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEventClick={() => navigate(`/events/${event._id}`)}
            />
          ))
        ) : (
          <p>No events found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
