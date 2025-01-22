import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../pages/Footer/Footer1";
import "../Category/category.css";

const departments = [
  "DOCSE",
  "DOEEE",
  "Civil", 
  "GE",
  ];

const Department = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]); // Default category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get the department name from the enum
        

        const response = await fetch(
          `https://kevent-server.onrender.com/events/eventsByDepartment?department=${selectedDepartment.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch events. Please try again later.");
        setEvents([]);
      }
    };

    fetchEvents();
  }, [selectedDepartment]); // Dependency on department for dynamic fetching

  return (
    <div>
    <Navbar />
<div className="category-header">
<h1>Events by Department</h1>

{/* Enhanced Dropdown */}
<div className="category-dropdown">
<select
  value={selectedDepartment}
  onChange={(e) => setSelectedDepartment(e.target.value)}
>
  {departments.map((department) => (
    <option key={department} value={department}>
      {department}
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
          <div>No events found for this department.</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Department;
