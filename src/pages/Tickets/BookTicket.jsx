import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import "./BookTicket.css"; // Import the CSS file

const BookTicket = () => {
  const { id: eventId } = useParams(); // Get the event ID from the URL
  const [ticketCount, setTicketCount] = useState(1); // Default ticket count
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [eventDetails, setEventDetails] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://kevent-server.onrender.com/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    setTicketCount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    if (!token) {
      Swal.fire("Error", "User not authenticated. Please log in.", "error");
      return;
    }

    if (!eventId) {
      Swal.fire("Error", "Event ID is missing.", "error");
      return;
    }

    if (eventDetails) {
      const totalBooked = eventDetails.bookedTickets || 0;
      if (eventDetails.capacity != null && totalBooked + parseInt(ticketCount) > eventDetails.capacity) {
        Swal.fire("Error", "Not enough capacity available.", "error");
        return;
      }
    }

    try {
      const response = await fetch(`https://kevent-server.onrender.com/tickets/booktickets/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify({
          eventId,
          message: `Ticket confirmed for event ${eventId}.`,
          type: "confirmation",
          ticketCount,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }
      Swal.fire("Success", "Ticket Booked SUccesfully", "success");
      console.log("Ticket Booked successfully");

      // Generate QR code
      const qrCodeData = `Event: ${eventId}, Tickets: ${ticketCount}`;
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
      setQrCodeUrl(qrCodeUrl);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      console.error("Error creating notification:", error);
    }
  };

  return (
    <div className="book-ticket">
      <h2>Book Your Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ticketCount">Number of Tickets:</label>
          <input type="number" id="ticketCount" name="ticketCount" value={ticketCount} onChange={handleInputChange} min="1" required />
        </div>
        <button type="submit">Book Ticket</button>
      </form>
      {qrCodeUrl && (
        <div className="qr-code">
          <h3>Your QR Code</h3>
          <img src={qrCodeUrl} alt="QR Code" />
          <a href={qrCodeUrl} download="qrcode.png">
            <button>Download QR Code</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default BookTicket;
