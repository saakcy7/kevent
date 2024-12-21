import React from "react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
const CreateEvent = ({ token }) => {
  const navigate = useNavigate();
  const [eventdata, setEventData] = useState({
    Title: "",
    Description: "",
    contactNumber: "",
    Venue: "",
    date: "",
    Price: "",
    mainImage: "",  
  });

  const [mainImage, setmainImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Add this line
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setmainImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Preview image
      };
      reader.readAsDataURL(selectedFile); // Read file
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventdata, [name]: value });
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!eventdata.Title || !eventdata.Description || !eventdata.Department || !eventdata.contactNumber || !eventdata.Venue || !eventdata.date || !eventdata.Price || !eventdata.capacity) {
  //     Swal.fire("Error", "Please add all the fields.", "error");
  //     return;
  //   }
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     Swal.fire("Error", "Authentication token not found. Please log in again.", "error");
  //     return;
  //   }
  //   console.log("Auth token", token);
  //   try {
  //     const response = await fetch("http://localhost:3000/events/createevent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(eventdata),
  //     });
  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(errorMessage);
  //     }
  //     const responseData = await response.json();
  //     console.log("Event created successfully:", responseData);
  //     Swal.fire("Success", "Event created successfully!", "success");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error.message || "An error occurred during login.",
  //     });
  //     console.error("Error logging in:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!eventdata.Title || !eventdata.Description || !eventdata.contactNumber || !eventdata.Venue || !eventdata.date || !eventdata.Price || !eventdata.capacity) {
    //   Swal.fire("Error", "Please add all the fields.", "error");
    //   return;
    // }

    // Prepare the form data for sending to the backend
    const formData = new FormData();
    formData.append("Title", eventdata.Title);
    formData.append("Description", eventdata.Description);
    formData.append("contactNumber", eventdata.contactNumber);
    formData.append("Venue", eventdata.Venue);
    formData.append("date", eventdata.date);
    formData.append("Price", eventdata.Price);
    console.log("hello");

    // formData.append("capacity", eventdata.capacity);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Authentication token not found. Please log in again.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/events/createevent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      Swal.fire("Success", "Event created successfully!", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error", error.message || "An error occurred.", "error");
    }
  };

  return (
    <>
      <div className="event-form-container">
        <div className="form-group">
          <label>Event Main Image</label>
          <div className="image-upload-container">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
            {imageUrl && (
              <div className="image-upload-details">
                <p>Selected image:</p>
                <img src={imageUrl} alt="Selected Preview" style={{ width: "100px", height: "100px" }} />
              </div>
            )}
          </div>
        </div>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" name="Title" onChange={handleChange} placeholder="Enter event title" value={eventdata.Title} />
          </div>
          <div className="form-group">
            <label>Event Description</label>
            <textarea placeholder="Enter event description" name="Description" onChange={handleChange} value={eventdata.Description}></textarea>
          </div>
          <div className="form-group event-details">
            <div className="form-field">
              <label>Contact Number</label>
              <input type="text" placeholder="9862410306" name="contactNumber" onChange={handleChange} value={eventdata.contactNumber} />
            </div>
            <div className="form-field">
              <label>Venue</label>
              <input type="text" placeholder="Enter venue" name="Venue" onChange={handleChange} value={eventdata.Venue} />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input type="date" name="date" onChange={handleChange} value={eventdata.date} />
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
              <div className="form-field-yes">
                <input type="radio" id="yes" name="registration" value="yes" />
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="no" name="registration" value="no" />
                <label htmlFor="no">No</label>
              </div>
            </div>
            <div className="form-field">
              <label>Price</label>
              <input type="text" placeholder="Enter price" name="Price" onChange={handleChange} value={eventdata.Price} />
            </div>
          </div>
          {/*<div className="file-upload">
            <label>Add FIles</label>
          <input type="file" className="upload-btn" name='Files' onChange={handleFileChange} multiple/>
          <label>Add images</label>
          <input type="file" className="upload-btn" name='Images' onChange={handleFileChange} multiple/>
        </div>*/}
          <button type="submit" className="create-btn">
            Create Event
          </button>
        </form>
      </div>
    </>
  );
};
export default CreateEvent;
