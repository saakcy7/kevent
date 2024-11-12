import React, { useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditEvent.css'; // Add your CSS styles here

const EditEvent = () => {
  const { id } = useParams();
  console.log('Event ID:', id);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    Title:"",
    Description:"",
    Department:"",
    contactNumber:"",
    Venue:"", 
    date:"", 
    Price:"",
    capacity:"",
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/viewevent/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        console.log('Fetched event:', data.event);
              // Format the date to YYYY-MM-DDTHH:MM without converting to UTC
              const eventDate = new Date(data.event.date);
              const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}T${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`;
              
              setEventData({ ...data.event, date: formattedDate });
             
          
      } catch (error) {
        console.error('Failed to fetch event:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch event. Please try again.',
        });
      }
    };
    if(id){
    fetchEvent();
    }
  }, [id]);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
 };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      if (eventData.capacity <= 0) {
        Swal.fire("Error", "Capacity must be greater than zero.", "error");
        return;
      }
      if (eventData.contactNumber.length < 10) {
        Swal.fire("Error", "Contact number must be 10 digits.", "error");
        return;
      }
      if (eventData.contactNumber.length > 10) {
        Swal.fire("Error", "Contact number cannot be more than 10 digits.", "error");
        return;
      }
      if (eventData.Price < 0) {
        Swal.fire("Error", "Price must be greater than or equal to zero.", "error");
        return;
      }
     /* if (eventData.date < new Date().toISOString()) {
        Swal.fire("Error", "Event date must be in the future.", "error");
        return;
      }*/
      
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Event updated successfully.',
      });

      navigate('/profile'); // Redirect to events page
    } catch (error) {
      console.error('Failed to update event:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update event. Please try again.',
      });
    }
  };

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="edit-event-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={eventData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            id="venue"
            name="Venue"
            value={eventData.Venue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="Description"
            value={eventData.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="department"
            name="Department"
            value={eventData.Department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={eventData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={eventData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="Price"
            value={eventData.Price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;