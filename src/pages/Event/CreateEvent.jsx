// CreateEventForm.js
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent=()=> {
    const navigate= useNavigate();
    const [data, setData] = useState({
        Title:"",
        Description:"",
        contactNumber:"",
        Venue:"", 
        date:"", 
        Price:"", 
        })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setData({ ...data, [name]: value });
          };
        
         
        
        
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.Title || !data.Description || !data.contactNumber || !data.Venue || !data.date || !data.Price) {
        Swal.fire("Error", "Please add all the fields.", "error");
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
                body: JSON.stringify(data),
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
          <input type="text" name='Title' onChange={handleChange} placeholder="Enter event title" value={data.Title} />
        </div>

        <div className="form-group">
          <label>Event Description</label>
          <textarea placeholder="Enter event description" name='Description' onChange={handleChange} value={data.Description}></textarea>
        </div>

        <div className="form-group event-details">
          <div className="form-field">
            <label>Contact Number</label>
            <input type="text" placeholder="9862410306" name='contactNumber' onChange={handleChange} value={data.contactNumber}/>
          </div>

          <div className="form-field">
            <label>Venue</label>
            <input type="text" placeholder="Enter venue" name='Venue' onChange={handleChange} value={data.Venue} />
          </div>

          <div className="form-field">
            <label>Date</label>
            <input type="date" name='date' onChange={handleChange} value={data.date}  />
          </div>

          <div className="form-field time-input">
            <label>From</label>
            <input type="time" />
          </div>

          <div className="form-field time-input">
            <label>To</label>
            <input type="time" />
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
            <input type="text" placeholder="Enter price" name='Price' onChange={handleChange} value={data.Price} />
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