
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Notification from '../Notification/Notification';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.css';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // Check login status from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logged out successfully!",
    });
    navigate("/")
  };

  return (
    <header className="navigation">
      {isLoggedIn?(<Link to="/dashboard" className="navigation_name">
        KEVENT
      </Link>):(<Link to="/" className="navigation_name">
        KEVENT
      </Link>)}
      
      <div className="navigation__menu">
       
        {isLoggedIn ? (
          <>
            <Link to="/about" className="menu">
              <i class="fa-solid fa-house"></i>
            </Link>
            <Link to="/createevent" className="menu1">
              <i class="fa-solid fa-plus"></i>
            </Link>
            <Link to="/profile" className="menu2">
              <i class="fa-solid fa-user"></i>
            </Link>
            <button onClick={toggleNotifications} className="notification">
            <i class="fa-solid fa-bell"></i>
          </button>
          {showNotifications && (
            <div className="notification-dropdown-container">
              <Notification />
            </div>
          )}
            <Link to="/searchevent" className="menu2">
            <i class="fa-solid fa-magnifying-glass"></i>
            </Link>
            <button onClick={handleLogout} className="menu3">
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to="/about" className="menu">
              <i class="fa-solid fa-house"></i>
            </Link>
            <Link to="/signup" className="menu2">
              <button className="sign">Sign Up/Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
