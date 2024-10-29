<<<<<<< HEAD
import { useState, React } from "react";
import { Link } from "react-router-dom";

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
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
      <Link to="/" className="navigation_name">
        KEVENT
      </Link>
      <div className="navigation__menu">
        {isLoggedIn ? (
          <>
            <Link to="/about" className="menu">
              About
            </Link>
            <Link to="/createevent" className="menu1">
              Create Event
            </Link>
            <Link to="/profile" className="menu2">
              Profile
            </Link>
            <Link to="/searchevent" className="menu2">
            <i class="fa-solid fa-magnifying-glass"></i>
            </Link>
            <button onClick={handleLogout} className="menu3">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/about" className="menu">
              About
            </Link>
            <Link to="/signup" className="menu2">
              <button className="sign">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
>>>>>>> sakshi
