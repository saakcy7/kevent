import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import Navbar from '../../components/Navbar/Navbar';

const EventCategory = {
  Workshop: "workshop",
  Seminar: "seminar",
  Conference: "conference",
  Webinar: "webinar",
  Meetup: "meetup",
  Others: "others",
};


const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventdata, setEventData] = useState({
    Title: "",
    Description: "",
    department: "",
    contactNumber: "",
    Venue: "",
    date: "",
    Price: "",
    capacity: "",
    category: "",
  });

  const [mainImage, setMainImage] = useState(null); // State for main image
  const [otherImages, setOtherImages] = useState([]); // State for other images
  const [files, setFiles] = useState([]); // State for files

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventdata, [name]: value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

    if (file && !allowedFormats.includes(file.type)) {
      Swal.fire("Error", "Only JPEG, PNG, JPG, or SVG images are allowed for the main image.", "error");
      e.target.value = ""; // Clear the input
      return;
    }

    setMainImage(file);
  };

  const handleOtherImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];
    const invalidFiles = selectedFiles.filter((file) => !allowedFormats.includes(file.type));

    if (invalidFiles.length > 0) {
      Swal.fire("Error", "Only JPEG, PNG, JPG, or SVG images are allowed for other images.", "error");
      e.target.value = ""; // Clear the input
      return;
    }

    if (selectedFiles.length + otherImages.length > 5) {
      Swal.fire("Error", "You can upload up to 5 images only.", "error");
      e.target.value = ""; // Clear the input
      return;
    }

    setOtherImages([...otherImages, ...selectedFiles]);
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const invalidFiles = selectedFiles.filter((file) => file.type !== "application/pdf");

    if (invalidFiles.length > 0) {
      Swal.fire("Error", "Only PDF files are allowed for upload.", "error");
      e.target.value = ""; // Clear the input
      return;
    }

    if (selectedFiles.length + files.length > 3) {
      Swal.fire("Error", "You can upload up to 3 files only.", "error");
      e.target.value = ""; // Clear the input
      return;
    }

    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !eventdata.Title ||
      !eventdata.Description ||
      !eventdata.contactNumber ||
      !eventdata.Venue ||
      !eventdata.date ||
      !eventdata.Price ||
      !eventdata.capacity ||
      !eventdata.category
    ) {
      Swal.fire("Error", "Please fill all the fields.", "error");
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

    if (new Date(eventdata.date) < new Date()) {
      Swal.fire("Error", "Event date must be in the future.", "error");
      return;
    }

    if (eventdata.contactNumber.length !== 10) {
      Swal.fire("Error", "Contact number must be exactly 10 digits.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Authentication token not found. Please log in again.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("Title", eventdata.Title);
    formData.append("Description", eventdata.Description);
    formData.append("department", eventdata.department);
    formData.append("contactNumber", eventdata.contactNumber);
    formData.append("Venue", eventdata.Venue);
    formData.append("date", eventdata.date);
    formData.append("Price", eventdata.Price);
    formData.append("capacity", eventdata.capacity);
    formData.append("category", eventdata.category);

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    otherImages.forEach((file) => formData.append("otherImages", file));
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("https://kevent-server.onrender.com/events/createevent", {
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred while creating the event.",
      });
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="event-form-container">
      
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="Title"
            onChange={handleChange}
            placeholder="Enter event title"
            value={eventdata.Title}
          />
        </div>

        <div className="form-group">
          <label>Event Description</label>
          <textarea
            placeholder="Enter event description"
            name="Description"
            onChange={handleChange}
            value={eventdata.Description}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={eventdata.department}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={eventdata.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select a Category --
            </option>
            {Object.values(EventCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group event-details">
          <div className="form-field">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="9862410306"
              name="contactNumber"
              onChange={handleChange}
              value={eventdata.contactNumber}
            />
          </div>

          <div className="form-field">
            <label>Venue</label>
            <input
              type="text"
              placeholder="Enter venue"
              name="Venue"
              onChange={handleChange}
              value={eventdata.Venue}
            />
          </div>

          <div className="form-field">
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
            <input
              type="datetime-local"
              name="date"
              onChange={handleChange}
              value={eventdata.date}
            />
          </div>

          <div className="form-field">
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter price"
              name="Price"
              onChange={handleChange}
              value={eventdata.Price}
            />
          </div>
        </div>

        <div className="file-upload">
          <label>Upload Main Image</label>
          <input
            type="file"
            className="upload-btn"
            name="mainImage"
            onChange={handleMainImageChange}
            accept="image/jpeg, image/png, image/jpg, image/svg+xml"
          />
        </div>

        <div className="file-upload">
          <label>Upload Other Images</label>
          <input
            type="file"
            className="upload-btn"
            name="otherImages"
            onChange={handleOtherImagesChange}
            accept="image/jpeg, image/png, image/jpg, image/svg+xml"
            multiple
          />
        </div>

        <div className="file-upload">
          <label>Upload Files (PDF only)</label>
          <input
            type="file"
            className="upload-btn"
            name="files"
            onChange={handleFilesChange}
            accept="application/pdf"
            multiple
          />
        </div>

        <button type="submit" className="create-btn">
          Create Event
        </button>
      </form>
    </div>
  </div>
  );
};

export default CreateEvent;
