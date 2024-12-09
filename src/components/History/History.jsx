import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../Event/event.css";

const History = ({ token }) => {
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events"); // Default tab

  useEffect(() => {
    const fetchExpiredItems = async () => {
      setLoading(true);
      try {
        const eventsResponse = await fetch("http://localhost:3000/users/expiredevents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const ticketsResponse = await fetch("http://localhost:3000/users/expiredtickets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!eventsResponse.ok || !ticketsResponse.ok) {
          throw new Error("Failed to fetch expired items");
        }

        const eventsData = await eventsResponse.json();
        const ticketsData = await ticketsResponse.json();

        setExpiredEvents(eventsData.data || []);
        setExpiredTickets(ticketsData.data || []);
      } catch (error) {
        console.error("Error fetching expired items:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch expired events or tickets. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredItems();
  }, [token]);

  return (
    <div className="events">
      <button
        className={`tab-button ${activeTab === "events" ? "active" : ""}`}
        onClick={() => {
          setActiveTab("events");
        }}
      >
        Expired Events
      </button>
      <button
        className={`tab-button ${activeTab === "tickets" ? "active" : ""}`}
        onClick={() => {
          setActiveTab("tickets");
        }}
      >
        Expired Tickets
      </button>

      <hr className="separator" />

      {activeTab === "events" && (
        <>
          <h3>Expired Events</h3>
          {expiredEvents.length > 0 ? (
            <ul>
              {expiredEvents.map((event) => (
                <li key={event._id} className="event-container">
                  <div className="event-image">
                    <img src={event.image || ""} alt={event.Title || "Event"} />
                  </div>
                  <div className="info">
                    <h3>{event.Title}</h3>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Venue: {event.Venue}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No expired events found.</p>
          )}
        </>
      )}

      {activeTab === "tickets" && (
        <>
          <h3>Expired Tickets</h3>
          {expiredTickets.length > 0 ? (
            <ul>
              {expiredTickets.map((ticket) => (
                <li key={ticket._id} className="event-container">
                  <div className="event-image">
                    <img src={ticket.image || ""} alt={ticket.eventId?.Title || "Ticket"} />
                  </div>
                  <div className="info">
                    <h3>{ticket.eventId?.Title}</h3>
                    <p>Date: {new Date(ticket.eventDate).toLocaleDateString()}</p>
                    <p>Venue: {ticket.eventId?.Venue}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No expired tickets found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default History;
