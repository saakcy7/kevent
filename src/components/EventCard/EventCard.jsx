import React from 'react';
import './EventCard.css'; // Assuming you have a CSS file for styling

const EventCard = ({ event, onEventClick }) => {
  return (
    <div className='card-container'>
    
      <div className="event-card" onClick={onEventClick}>
        {/* Display the main image */}
        {event.mainImage && (
          <div className="event-image-container">
            <img 
              src={event.mainImage} 
              alt="Event Main" 
              className="event-main-image" 
            />
          </div>
        )}
        <h2 className="event-title">{event.Title}</h2>
        <p className="event-description">{event.Description}</p>
        <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
      </div>
    </div>

  );
};

export default EventCard;
