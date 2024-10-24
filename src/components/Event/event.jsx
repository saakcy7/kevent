import React from "react";
import "./event.css";

const Events = (props) => {
  console.log("Props received:", props);

  const { title, date, venue } = props.info;

  if (props.type === "history") {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src="" alt=""></img>
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>Date: {date.toISOString().split("T")[0]}</p>
          <p>Venue: {venue} </p>
        </div>
      </div>
    );
  } else if (props.type === "event") {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src="" alt=""></img>
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>Date: {date.toISOString().split("T")[0]}</p>
          <p>Venue: {venue} </p>
        </div>
      </div>
    );
  } else if (props.type === "ticket") {
    return (
      <div className="event-container">
        <div className="image">
          <img className="event-image" src="" alt=""></img>
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>Date: {date.toISOString().split("T")[0]}</p>
          <p>Venue: {venue} </p>
        </div>
      </div>
    );
  }
};

export default Events;
