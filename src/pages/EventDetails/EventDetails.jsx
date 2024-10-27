import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css'; // Assuming you have a CSS file for styling

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch event data from the backend
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/viewevent/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
        const data = await response.json();
        console.log('Fetched event data:', data);
        setEvent(data.event);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-details">
     <h2 className="event-title">{event?.Title || 'No Title Available'}</h2>
<p className="event-description">{event?.Description || 'No Description Available'}</p>
<p className="event-contact">Contact: {event?.contactNumber || 'Not Provided'}</p>
<p className="event-venue">Venue: {event?.Venue || 'Not Specified'}</p>
<p className="event-price">Price: RS.{event?.Price || 'Free'}</p>
<p className="event-date">Date: {new Date(event?.date).toLocaleDateString() || 'Not Specified'}</p>

      
    
    </div>
  );
};

export default EventDetails;