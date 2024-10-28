import "./userProfile.css";
import React, { useState, useEffect } from "react";
import Events from "../../components/Event/event";
import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/profile";
import Swal from "sweetalert2";
import axios from "axios";

const Sidebar = () => {
  const [currentComponent, setCurrentComponent] = useState(<Profile />);
  const [currentHeading, setcurrentHeading] = useState("Profile");
  const [user, setUser] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  const token = localStorage.getItem("token");

  const historyData = [
    { title: "angry Conference", date: new Date("2024-11-10"), venue: "Kathmandu" },
    { title: "upset Festival", date: new Date("2024-12-15"), venue: "Pokhara" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
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
        const response = await axios.get(`http://localhost:3000/users/viewevents`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setEventData(response.data.events);
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
      try {
        const response = await axios.get(`http://localhost:3000/users/viewtickets`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setTicketData(response.data.tickets);
      } catch (error) {
        console.error("Tickets fetch error:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch tickets. Please try again.",
        });
      }
    };

    fetchTickets();
  }, [token]);

  useEffect(() => {
    if (user) {
      setCurrentComponent(<Profile user={user} token={token} />);
    }
  }, [user, token]);

  const handleButtonClick = (heading, component) => {
    setCurrentComponent(component);
    setcurrentHeading(heading);
  };

  return (
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
                eventData.map((eventData, index) => <Events key={index} type="event" info={eventData} />)
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
                ticketData.map((ticketData, index) => <Events key={index} type="ticket" info={ticketData.eventId} />)
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
            <button className="sidebar-items logout" onClick={() => handleButtonClick(null)}>
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
