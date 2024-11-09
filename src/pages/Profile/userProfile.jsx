import "./userProfile.css";
import React, { useState, useEffect } from "react";
import Events from "../../components/Event/event";
import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/profile";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [currentComponent, setCurrentComponent] = useState(<Profile />);
  const [currentHeading, setCurrentHeading] = useState("Profile");
  const [user, setUser] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [eventData, setEventData] = useState([]);

  const token = localStorage.getItem("token");

  const historyData = [
    { title: "angry Conference", date: new Date("2024-11-10"), venue: "Kathmandu" },
    { title: "upset Festival", date: new Date("2024-12-15"), venue: "Pokhara" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to view profile. Please try again.",
        });
        setUser(null);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await fetch(`http://localhost:3000/users/viewevents`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        console.log("Fetched events:", data.events);
        setEventData(data.events);
      } catch (error) {
        console.error("Events fetch error:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch events. Please try again.",
        });
      }
    };

    fetchEvents();
  }, [token]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      try {
        const response = await fetch(`http://localhost:3000/users/viewtickets`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 404) {
          await Swal.fire({
            icon: "info",
            title: "No Tickets",
            text: "No tickets found for this user.",
          });
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch tickets:", errorText);
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        const userTickets = data.tickets.filter(ticket => ticket.userId === user._id); // Filter tickets by user ID

        setTicketData(userTickets);
      } catch (error) {
        console.error("Tickets fetch error:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message || "Failed to fetch tickets. Please try again.",
        });
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [token,user]);

  useEffect(() => {
    if (user) {
      setCurrentComponent(<Profile user={user} token={token} />);
    }
  }, [user, token]);

  const handleButtonClick = (heading, component) => {
    setCurrentComponent(component);
    setCurrentHeading(heading);
  };

  const handleDeleteEvent = async (eventId) => {
    console.log("Deleting event:", eventId);
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete event");
      }

      setEventData(prevEventData => prevEventData.filter(event => event._id !== eventId));
      setTicketData(prevTicketData => prevTicketData.filter(ticket => ticket.eventId !== eventId)); // Remove associated tickets
      Swal.fire("Success", "Event and associated tickets deleted successfully", "success");
    } catch (error) {
      console.error("Event deletion error:", error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to delete event. Please try again.",
      });
    }
  };

  const handleEditEvent = (eventId) => {
    window.location.href = `/editevent/${eventId}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/home";
  };

  return (
    <div className="wrapper">
      <div className="profile-container">
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-items" onClick={() => handleButtonClick("Profile", <Profile user={user} token={token} />)}>
              <i className="fas fa-user"></i> Profile
            </button>
            <button
              className="sidebar-items"
              onClick={() =>
                handleButtonClick(
                  "My Events",
                  eventData
                    .filter(event => event.userId === user.id) // Filter events by user ID
                    .map((event) => (
                      <Events
                        key={event._id}
                        type="event"
                        info={event}
                        onEdit={() => handleEditEvent(event._id)}
                        onDelete={() => handleDeleteEvent(event._id)}
                      />
                    ))
                )
              }
            >
              <i className="fas fa-calendar-alt"></i> Events
            </button>
            <button
              className="sidebar-items"
              onClick={() =>
                handleButtonClick(
                  "My Tickets",
                  ticketData.map((ticket) => <Events key={ticket._id} type="ticket" info={ticket.eventId} />)
                )
              }
            >
              <i className="fas fa-ticket-alt"></i> Tickets
            </button>
            <button
              className="sidebar-items"
              onClick={() =>
                handleButtonClick(
                  "History",
                  historyData.map((event, index) => <Events key={index} type="history" info={event} />)
                )
              }
            >
              <i className="fas fa-history"></i> History
            </button>

            <hr className="sidebar-divider" />
            <div className="sidebar-footer">
              <button className="sidebar-items logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
        <div className="component-container">
          <h2>{currentHeading}</h2>
          {currentComponent}
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
};

export default UserProfile;