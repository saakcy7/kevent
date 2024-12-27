import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:3000/notifications/notification", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (typeof data.unreadCount !== "number") {
        throw new Error("Invalid unreadCount type");
      }
      setUnreadCount(data.unreadCount); // Ensure valid number
      setNotifications(data.notifications.slice(0, 4));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("http://localhost:3000/notifications/notification/markAsRead", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUnreadCount(data.unreadCount); // Directly update unread count to 0
      } else {
        console.error(data.error || "Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  console.log("Unread Count:", unreadCount);

  const toggleNotifications = async () => {
    setShowNotifications((prev) => !prev);

    if (!showNotifications) {
      try {
        await markAllAsRead(); // Wait for marking notifications as read
        setUnreadCount(0); // Explicitly set unread count to 0
        await fetchNotifications(); // Refresh notifications
      } catch (error) {
        console.error("Error handling notifications:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logged out successfully!",
    });
    navigate("/");
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, [token]); // Ensure correct dependencies

  console.log("Unread Count:", unreadCount); // Log unreadCount from state

  // When notification button is clicked, mark all as read
  useEffect(() => {
    if (isNotificationClicked) {
      markAllAsRead();
    }
  }, [isNotificationClicked]);

  return (
    <header className="navigation">
      {isLoggedIn ? (
        <Link to="/dashboard" className="navigation_name">
          KEVENT
        </Link>
      ) : (
        <Link to="/" className="navigation_name">
          KEVENT
        </Link>
      )}

      <div className="navigation__menu">
        {isLoggedIn ? (
          <>
            <Link to="/about" className="menu">
              <i className="fa-solid fa-house"></i>
            </Link>
            <Link to="/createevent" className="menu1">
              <i className="fa-solid fa-plus"></i>
            </Link>
            <Link to="/profile" className="menu2">
              <i className="fa-solid fa-user"></i>
            </Link>

            {/* Notification button */}
            <button onClick={toggleNotifications} className="notification">
              <i className="fa-solid fa-bell"></i>
              {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className="notification-dropdown-container">
                <Notification notifications={notifications} setUnreadCount={setUnreadCount} />
              </div>
            )}

            <Link to="/searchevent" className="menu2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <button onClick={handleLogout} className="menu3">
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to="/about" className="menu">
              <i className="fa-solid fa-house"></i>
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
