import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "../Category/category.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../Footer/Footer1";

const clubs= [
    "Kucc",
  "Seee",
  "Aisec",
  "Leo",
  "Rotract"
];

const Club = () => {
  const [selectedClub, setSelectedClub] = useState(clubs[0]); // Default category
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://kevent-server.onrender.com/events/eventsByClub?club=${selectedClub.toLowerCase()}`
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
  }, [selectedClub]);

  return (
    <div>
        <Navbar />
    <div className="category-header">
  <h1>Events by Club</h1>

  {/* Enhanced Dropdown */}
  <div className="category-dropdown">
    <select
      value={selectedClub}
      onChange={(e) => setSelectedClub(e.target.value)}
    >
      {clubs.map((club) => (
        <option key={club} value={club}>
          {club}
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
          <div>No events found for this category.</div>
        )}
      </div>
        
        <Footer />
    </div>
    
  );
};

export default Club;
