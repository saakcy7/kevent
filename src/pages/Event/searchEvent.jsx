import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./searchEvent.css";

const SearchEvent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://kevent-server.onrender.com/events/search?search=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(data.event); // Ensure the correct property name
      setError(null);
      setIsPopupVisible(true);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for events"
        />
        <button className="button1" type="submit">  
          <Link to="/searchevent" className="menu2">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Link></button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            
            {error && <p className="error-message">{error}</p>}
            <div className="search-results">
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="search-result"
                    onClick={() => handleEventClick(event._id)}
                  >
                    <h3 className="event-title">{event.Title}</h3>
                    <p className="event-description">{event.Description}</p>
                  </div>
                ))
              ) : (
                <p>No events found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEvent;
