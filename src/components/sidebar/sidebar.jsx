import "./sidebar.css";
import React, { useState } from "react";
import Events from "../Event/event";

const Sidebar = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleButtonClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div className="sidebar">
      <div className="side-profile">
        <img className="profile-pic" alt="Profile" />
        <h4>Nirjara Thapa</h4>
      </div>
      <div className="sidebar-menu">
        <button onClick={() => handleButtonClick(<Events />)}>
          <i className="fas fa-user"></i> Profile
        </button>
        <button onClick={() => handleButtonClick(<Events />)}>
          <i className="fas fa-calendar-alt"></i> Events
        </button>
        <button onClick={() => handleButtonClick(<Events />)}>
          <i className="fas fa-ticket-alt"></i> Tickets
        </button>
        <button onClick={() => handleButtonClick(<Events />)}>
          <i className="fas fa-history"></i> History
        </button>
      </div>
      <div className="sidebar-footer">
        <button onClick={() => handleButtonClick(null)}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Render the selected component */}
      <div className="component-container">{currentComponent}</div>
    </div>
  );
};

export default Sidebar;
