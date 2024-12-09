import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchEvent.css";

const SearchEvent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/search?search=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(data.event); // Ensure the correct property name
      setError(null);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for events" />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="search-results">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="search-result" onClick={() => handleEventClick(event._id)}>
              <h3 className="event-title">{event.Title}</h3>
              <p className="event-description">{event.Description}</p>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default SearchEvent;
