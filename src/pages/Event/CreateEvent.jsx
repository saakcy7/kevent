// CreateEventForm.js
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent=()=> {
    const navigate= useNavigate();
    const [eventdata, setEventData] = useState({
        Title:"",
        Description:"",
        Department:"",
        contactNumber:"",
        Venue:"", 
        date:"", 
        Price:"",
        capacity:"", 
    
        })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setEventData({ ...eventdata, [name]: value });
          };
        
         
        
        
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!eventdata.Title || !eventdata.Description ||!eventdata.Department||!eventdata.contactNumber || !eventdata.Venue || !eventdata.date || !eventdata.Price|| !eventdata.capacity) {
        Swal.fire("Error", "Please add all the fields.", "error");
        return;
      }
      if (eventdata.capacity <= 0) {
        Swal.fire("Error", "Capacity must be greater than zero.", "error");
        return;
      }
      if (eventdata.Price < 0) {
        Swal.fire("Error", "Price must be greater than or equal to zero.", "error");
        return;
      }
      if (eventdata.date < new Date().toISOString()) {
        Swal.fire("Error", "Event date must be in the future.", "error");
        return;
      }
      if (eventdata.contactNumber.length <10) {
        Swal.fire("Error", "Contact number must be 10 digits.", "error");
        return;
      }
      if (eventdata.contactNumber.length >10) {
        Swal.fire("Error", "Contact number cannot be more than 10 digits.", "error");
        return;
      }
        const token = localStorage.getItem("token"); 
        if (!token) {
            Swal.fire("Error", "Authentication token not found. Please log in again.", "error");
            return;
          }
        console.log("Auth token",token);
        try{
            
            const response = await fetch("http://localhost:3000/events/createevent", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(eventdata),
              });
              if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
              }
              const responseData = await response.json();
              console.log('Event created successfully:', responseData);
              Swal.fire("Success", "Event created successfully!", "success");
              navigate('/dashboard');
              
              

        }catch(error)
        {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "An error occurred during login.",
              });
              console.error("Error logging in:", error);
        }
    }
  return (
    <>
    <div className="event-form-container">
      {/*<div className="form-header">
        <h2>Add Main Image</h2>
        <input type="file"  alt="image" name='mainImage' placeholder='add' onChange={handleFileChange} accept='application/png'/>
      </div>*/}

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input type="text" name='Title' onChange={handleChange} placeholder="Enter event title" value={eventdata.Title} />
        </div>

        <div className="form-group">
          <label>Event Description</label>
          <textarea placeholder="Enter event description" name='Description' onChange={handleChange} value={eventdata.Description}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="Department"
            value={eventdata.Department || ""}
            onChange={handleChange}
            required
            placeholder="Enter department"
          />
        </div>
        <div className="form-group event-details">
          <div className="form-field">
            <label>Contact Number</label>
            <input type="text" placeholder="9862410306" name='contactNumber' onChange={handleChange} value={eventdata.contactNumber}/>
          </div>

          <div className="form-field">
            <label>Venue</label>
            <input type="text" placeholder="Enter venue" name='Venue' onChange={handleChange} value={eventdata.Venue} />
          </div>
          <div className="form-group">
          <label>Event Capacity</label>
          <input
            type="text"
            name="capacity"
            onChange={handleChange}
            placeholder="Enter event capacity"
            value={eventdata.capacity}
          />
        </div>

          <div className="form-field">
            <label>Date</label>
            <input type="datetime-local" name='date' onChange={handleChange} value={eventdata.date}  />
          </div>

          <div className="form-field registration">
            <label>Registration Needed?</label>
            <div className='form-field-yes'>
              <input type="radio" id="yes" name="registration" value="yes" />
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="registration" value="no" />
              <label htmlFor="no">No</label>
            </div>
          </div>

          <div className="form-field">
        <label>Price</label>
        <input
          type="text"
          placeholder="Enter price"
          name='Price'
          onChange={handleChange}
          value={eventdata.Price}
          className={eventdata.Price.toLowerCase() === 'free' ? 'free-price' : ''}
        />
      </div>
        </div>

        {/*<div className="file-upload">
            <label>Add FIles</label>
          <input type="file" className="upload-btn" name='Files' onChange={handleFileChange} multiple/>
          <label>Add images</label>
          <input type="file" className="upload-btn" name='Images' onChange={handleFileChange} multiple/>
        </div>*/}

        <button type="submit" className="create-btn">Create Event</button>
      </form>
    </div>
    </>
  );
};



export default CreateEvent