import { useState, useEffect, useRef } from "react";
import "./Notification.css";
import Swal from "sweetalert2";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWQxY2Y0NWQ2NGFhOGY4ZjM0ZDI1MyIsImlhdCI6MTczMTA4NTY2MywiZXhwIjoxNzMxMDk2NDYzfQ.ewFaRCsDtFbGZRAzgFB9uJbHw6qOuessikLsH0fyKvw";

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/notifications/notification", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Notification fetch failed");
        }

        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Notification fetch error:", error);
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch notifications. Please try again.",
        });
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <div className="notification" onClick={toggleNotification}>
      <i className="fas fa-bell notification-icon"></i>
      {isOpen && (
        <div className="notification-dropdown">
          {loading ? (
            <p>Loading notifications...</p>
          ) : notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <p className="notification-type">
                  <strong>{notification.type}</strong>
                </p>
                <p className="notification-message">{notification.message}</p>
              </div>
            ))
          ) : (
            <p>No notifications available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
