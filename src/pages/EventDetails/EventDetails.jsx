import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css'; // Assuming you have a CSS file for styling

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the event ID from the URL

  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleBookTicket = () => {
    navigate(`/booktickets/${id}`);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    // Fetch event data from the backend
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://kevent-server.onrender.com/events/viewevent/${id}`);
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
    <div className="event-details1">
      <h2 className="event-title">{event?.Title || 'No Title Available'}</h2>
      <p className="event-description">{event?.Description || 'No Description Available'}</p>
      <p className="event-department">Department: {event?.Department || 'Not Specified'}</p>
      <p className="event-contact">Contact: {event?.contactNumber || 'Not Provided'}</p>
      <p className="event-venue">Venue: {event?.Venue || 'Not Specified'}</p>
      <p className="event-price">{event?.Price || 'Free'}</p>
      <p className="event-date">Date: {new Date(event?.date).toLocaleDateString() || 'Not Specified'}</p>
      <p className="event-capacity">Capacity: {event?.capacity || 'Not Specified'}</p>

      {/* Display main image */}
      {event?.mainImage && (
        <div className="event-main-image">
          <h3>Main Image</h3>
          <img
            src={event.mainImage}
            alt="Main Event"
            onClick={() => handleImageClick(event.mainImage)}
            className="clickable-image"
          />
        </div>
      )}

      {event?.Images?.length > 0 && (
        <div className="event-other-images">
          <h3>Other Images</h3>
          <div className="image-gallery">
            {event.Images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Event Image ${index + 1}`}
                className="other-image clickable-image"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
      )}


 {event.Files?.length > 0 && (
  <div className="event-files">
    <h3>Files</h3>
    <ul>
      {event.Files.map((file, index) => (
        <li key={index}>
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
          >
            View File {index + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}



      <button onClick={handleBookTicket} className="book-ticket-button">Book Ticket</button>

      {/* Modal for displaying the clicked image */}
      {isImageModalOpen && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Large Event" className="modal-image" />
            <span className="close-modal" onClick={handleCloseModal}>&times;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
