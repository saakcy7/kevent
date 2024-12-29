import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const EventList = ({ onEventClick }) => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://kevent-server.onrender.com/events/viewevents");
        const eventdata = await response.json();
        if (Array.isArray(eventdata.events)) {
          const normalizedEvents = eventdata.events.map((event) => ({
            ...event,
            title: event.Title,
            description: event.Description,
            department: event.Department,
            venue: event.Venue,
            price: event.Price,
          }));
          setEvents(normalizedEvents);
        } else {
          throw new Error("Expected an array of events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      {error && <p className="error-message">{error}</p>}
      {Array.isArray(events) && events.map((event) => <EventCard key={event._id} event={event} onEventClick={() => onEventClick(event._id)} />)}
    </div>
  );
};

export default EventList;
