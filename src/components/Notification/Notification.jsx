// import { useState, useEffect, useRef } from "react";
// import "./Notification.css";
// import Swal from "sweetalert2";

// function Notification() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const notificationRef = useRef(null);

//   const toggleNotification = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:3000/notifications/notification", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Notification fetch failed");
//         }

//         const data = await response.json();
//         setNotifications(data.notifications);
//       } catch (error) {
//         console.error("Notification fetch error:", error);
//         await Swal.fire({
//           icon: "error",
//           title: "Error!",
//           text: "Failed to fetch notifications. Please try again.",
//         });
//         setNotifications([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [token]);

//   return (
//     <div className="notification" onClick={toggleNotification}>
//       <i className="fas fa-bell notification-icon"></i>
//       {isOpen && (
//         <div className="notification-dropdown">
//           {loading ? (
//             <p>Loading notifications...</p>
//           ) : notifications && notifications.length > 0 ? (
//             notifications.map((notification, index) => (
//               <div key={index} className="notification-item">
//                 <p className="notification-type">
//                   <strong>{notification.type}</strong>
//                 </p>
//                 <p className="notification-message">{notification.message}</p>
//               </div>
//             ))
//           ) : (
//             <p>No notifications available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Notification;

import { useState, useEffect } from "react";
import "./Notification.css";
import Swal from "sweetalert2";

function Notification({ token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleNotification = async () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      // Mark notifications as read when dropdown is opened
      try {
        await fetch("http://localhost:3000/notifications/markAsRead", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setUnreadCount(0); // Reset unread count
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
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
          throw new Error("Failed to fetch notifications.");
        }

        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount); // Set unread count from the API
      } catch (error) {
        console.error("Error fetching notifications:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch notifications. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  return (
    <div className="notification" onClick={toggleNotification}>
      <div className="notification-icon-wrapper">
        <i className="fas fa-bell notification-icon"></i>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </div>
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
