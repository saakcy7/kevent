import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditEvent.css';
import Navbar from '../../components/Navbar/Navbar';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    Title: "",
    Description: "",
    Department: "",
    contactNumber: "",
    Venue: "",
    date: "",
    Price: "",
    capacity: "",
  });
  const [mainImage, setMainImage] = useState(null); // State for mainImage
  const [otherImages, setOtherImages] = useState([]); // State for otherImages
  const [files, setFiles] = useState([]); // State for files

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/viewevent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        const eventDate = new Date(data.event.date);
        const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}T${String(eventDate.getHours()).padStart(2, "0")}:${String(eventDate.getMinutes()).padStart(2, "0")}`;
        setEventData({ ...data.event, date: formattedDate });
      } catch (error) {
        console.error("Failed to fetch event:", error);
        Swal.fire("Error", "Failed to fetch event. Please try again.", "error");
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];
    if (file && !allowedFormats.includes(file.type)) {
      Swal.fire("Error", "Only JPEG, PNG, JPG, or SVG images are allowed for the main image.", "error");
      e.target.value = "";
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
      e.target.value = "";
      return;
    }
    if (selectedFiles.length + otherImages.length > 5) {
      Swal.fire("Error", "You can upload up to 5 images only.", "error");
      e.target.value = "";
      return;
    }
    setOtherImages([...otherImages, ...selectedFiles]);
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const invalidFiles = selectedFiles.filter((file) => file.type !== "application/pdf");
    if (invalidFiles.length > 0) {
      Swal.fire("Error", "Only PDF files are allowed for upload.", "error");
      e.target.value = "";
      return;
    }
    if (selectedFiles.length + files.length > 3) {
      Swal.fire("Error", "You can upload up to 3 files only.", "error");
      e.target.value = "";
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (eventData.capacity <= 0) {
      Swal.fire("Error", "Capacity must be greater than zero.", "error");
      return;
    }

    if (eventData.contactNumber.length != 10) {
      Swal.fire("Error", "Contact number must be exactly 10 digits.", "error");
      return;
    }

    if (eventData.Price < 0) {
      Swal.fire("Error", "Price must be greater than or equal to zero.", "error");
      return;
    }

    if (new Date(eventData.date) < new Date()) {
      Swal.fire("Error", "Event date must be in the future.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("Title", eventData.Title);
    formData.append("Description", eventData.Description);
    formData.append("Department", eventData.Department);
    formData.append("contactNumber", eventData.contactNumber);
    formData.append("Venue", eventData.Venue);
    formData.append("date", eventData.date);
    formData.append("Price", eventData.Price);
    formData.append("capacity", eventData.capacity);

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    otherImages.forEach((file) => formData.append("otherImages", file));
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(`http://localhost:3000/events/updateevent/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      Swal.fire("Success", "Event updated successfully!", "success");
      navigate("/profile");
      console.log('Event data being sent:', eventData);

    } catch (error) {
      console.error("Failed to update event:", error);
      Swal.fire("Error", error.message || "Failed to update event. Please try again.", "error");
    }
  };

  return (
    <div className="edit-event-container">
      <Navbar />
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="edit-event-form">
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="Title"
            value={eventData.Title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="datetime-local"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            name="Venue"
            value={eventData.Venue}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="Description"
            value={eventData.Description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="Department"
            value={eventData.Department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={eventData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input
            type="text"
            name="capacity"
            value={eventData.capacity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="Price"
            value={eventData.Price}
            onChange={handleChange}
          />
        </div>
        <div className="file-upload">
          <label>Upload Main Image</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/jpeg, image/png, image/jpg, image/svg+xml"
          />
        </div>
        <div className="file-upload">
          <label>Upload Other Images</label>
          <input
            type="file"
            onChange={handleOtherImagesChange}
            accept="image/jpeg, image/png, image/jpg, image/svg+xml"
            multiple
          />
        </div>
        <div className="file-upload">
          <label>Upload Files (PDF only)</label>
          <input
            type="file"
            onChange={handleFilesChange}
            accept="application/pdf"
            multiple
          />
        </div>
        <button type="submit" className="submit-button">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
