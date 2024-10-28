import { useState, React } from "react";
import { Link } from "react-router-dom";
import Notification from "../Notification/notification";

import "./Navbar.css";
const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <>
      <header className="navigation">
        <Link to={"/"} className="navigation_name">
          KEVENT
        </Link>

        <div className="navigation__menu">
          <button onClick={toggleNotifications} className="notification">
            Notifications
          </button>
          {showNotifications && (
            <div className="notification-dropdown-container">
              <Notification />
            </div>
          )}

          <Link to={"/about"} className="menu">
            About
          </Link>
          <Link to={"/signup"} className="menu1">
            <button className="sign">Sign Up</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
