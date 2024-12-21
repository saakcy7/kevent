import React from 'react';
import './EventCard.css'; // Assuming you have a CSS file for styling

const EventCard = ({ event,onEventClick }) => {
  return (
    <div className='event-list'>
    <div className="event-card" onClick={onEventClick}>
      <h2 className="event-title">{event.Title}</h2>
      <p className="event-description">{event.Description}</p>
      <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
          </div>
          </div>
         
    

  );
};

export default EventCard;