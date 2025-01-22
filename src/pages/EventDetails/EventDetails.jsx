import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './EventDetails.css'; // Assuming you have a CSS file for styling
import Footer from '../../components/Footer/Footer';

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
        setEvent(data.event);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (error) {
    return <p className="error-message1">{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />

    <div className="event-details1">
      {/* Main Image Section */}
      {event?.mainImage && (
        <div className="event-main-image1">
          <img
            src={event.mainImage}
            alt="Main Event"
            onClick={() => handleImageClick(event.mainImage)}
            className="clickable-image1"
          />
        </div>
      )}

      {/* Event Title and Description */}
      <h2 className="event-title1">{event?.Title || 'No Title Available'}</h2>
      <p className="event-description1">{event?.Description || 'No Description Available'}</p>

      {/* Event Information */}
      <div className="event-info1">
        <p className="event-department1">Department: {event?.department || 'Not Specified'}</p>
        <p className="event-contact1">Contact: {event?.contactNumber || 'Not Provided'}</p>
        <p className="event-venue1">Venue: {event?.Venue || 'Not Specified'}</p>
        <p className="event-price1">{event?.Price || 'Free'}</p>
        <p className="event-date1">Date: {new Date(event?.date).toLocaleDateString() || 'Not Specified'}</p>
        <p className="event-capacity1">Capacity: {event?.capacity || 'Not Specified'}</p>
        <p className='event-category1'>Category: {event?.category || 'Not Specified'}</p>
        <p className='event-club1'>Club: {event?.club ||'Not Specified'}</p>
      </div>

      {/* Other Images Section */}
      {event?.Images?.length > 0 && (
        <div className="event-other-images1">
          <h3>Other Images</h3>
          <div className="image-gallery1">
            {event.Images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Event Image ${index + 1}`}
                className="other-image1 clickable-image1"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      {event.Files?.length > 0 && (
        <div className="event-files1">
          <h3>Files</h3>
          <ul>
            {event.Files.map((file, index) => (
              <li key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  View File {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Book Ticket Button */}
      <button onClick={handleBookTicket} className="book-ticket-button1">Book Ticket</button>

      {/* Modal for displaying the clicked image */}
      {isImageModalOpen && (
        <div className="image-modal1" onClick={handleCloseModal}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Large Event" className="modal-image1" />
            <span className="close-modal1" onClick={handleCloseModal}>&times;</span>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default EventDetails;
