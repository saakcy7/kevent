import React from "react";
import "./event.css";

const Events = (props) => {
  const { type, info } = props.children;
  const { title, date, venue } = info;

  let dummyData = { title: "Symphony of the stars", date: new Date("2022-01-12"), venue: "Somewhere" };
  // if (type == "history") {
  return (
    <div className="event-container">
      <div className="image">
        <img className="event-image" src=""></img>
      </div>
      <div className="info">
        <h3>{dummyData.title}</h3>
        <p>Date: {dummyData.date.toISOString().split("T")[0]}</p>
        <p>Venue: {dummyData.venue} </p>
      </div>
    </div>
  );
  // }
};

export default Events;
