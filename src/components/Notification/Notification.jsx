import React from "react";
import "./Notification.css";

const Notification = ({ notifications }) => {
  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <span>Notifications</span>
      </div>
      {notifications.length === 0 ? (
        <div className="no-notifications">No notifications</div>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="notification-item">
            {notification.message}
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
