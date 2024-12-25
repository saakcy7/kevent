import React from "react";
import "./event.css";
import { useNavigate } from "react-router-dom";

const Events = ({ info, type, onDownload }) => {
  const navigate = useNavigate();
  const { Title, date: eventDate, Venue, _id: eventId, mainImage } = info || {};

  const formattedDate = new Date(eventDate);

  const currentTime = new Date();
  const eventTime = new Date(formattedDate);
  const timeDifference = eventTime - currentTime;

  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const EventToday = remainingDays === 0;
  const hasEventPassed = eventTime <= currentTime;

  const Edit = () => {
    navigate(`/editevent/${eventId}`);
  };

  if (type === "history" || hasEventPassed) {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src={mainImage}></img>
        </div>
        <div className="info">
          <h3>{Title}</h3>
          <p>
            Date: {formattedDate.toLocaleDateString()} - {formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p>Venue: {Venue} </p>
        </div>
      </div>
    );
  } else if (type === "event") {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src={mainImage}></img>
        </div>
        <div className="info">
          <h3>{Title}</h3>
          <p>
            Date: {formattedDate.toLocaleDateString()} - {formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p>Venue: {Venue} </p>
        </div>
        <div className="event-button">
          <div className="edit-button">
            <button onClick={Edit}>Edit</button>
          </div>
          <div className="download-button">
            <a href onClick={() => onDownload(eventId)}>
              Download
            </a>
          </div>
        </div>
      </div>
    );
  } else if (type === "ticket") {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src={mainImage}></img>
        </div>
        <div className="info">
          <h3>{Title}</h3>
          <p>
            Date: {formattedDate.toLocaleDateString()} - {formattedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p>Venue: {Venue} </p>

          {!hasEventPassed && (
            <label className="remaining">
              Remaining:
              {remainingDays > 0 ? ` ${remainingDays} days  ` : remainingHours > 0 ? ` ${remainingHours} hours ` : remainingMinutes > 0 ? ` ${remainingMinutes} minutes` : ""}
            </label>
          )}
        </div>
      </div>
    );
  }
};

export default Events;
