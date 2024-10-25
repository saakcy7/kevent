import "./userProfile.css";
import React, { useState } from "react";
import Events from "../../components/Event/event";
import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/profile";

const Sidebar = () => {
  const [currentComponent, setCurrentComponent] = useState(<>Profile</>);
  const [currentHeading, setcurrentHeading] = useState("Profile");

  const eventData = [
    { title: "helloouurrrrr", date: new Date("2024-12-15T14:30:00"), venue: "Kathmandu" },
    { title: "okayyyyyy", date: new Date("2024-12-15"), venue: "Pokhara" },
  ];

  const ticketData = [
    { title: "happy Conference", date: new Date("2024-10-27T14:30:00"), venue: "Kathmandu" },
    { title: "sad Festival", date: new Date("2024-11-25T21:55:00.000"), venue: "Pokhara" },
  ];

  const historyData = [
    { title: "angry Conference", date: new Date("2024-11-10"), venue: "Kathmandu" },
    { title: "upset Festival", date: new Date("2024-12-15"), venue: "Pokhara" },
  ];

  const handleButtonClick = (heading, component) => {
    setCurrentComponent(component);
    setcurrentHeading(heading);
  };
  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="sidebar-menu">
          <button className="sidebar-items" onClick={() => handleButtonClick(" User Profile", <Profile />)}>
            <i className="fas fa-user"></i> Profile
          </button>
          <button
            className="sidebar-items"
            onClick={() =>
              handleButtonClick(
                "My Events",
                eventData.map((event, index) => <Events key={index} type="event" info={event} />)
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
                ticketData.map((event, index) => <Events key={index} type="ticket" info={event} />)
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
