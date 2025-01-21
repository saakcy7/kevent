import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navbar />

      <h1 className="about">ABOUT US</h1>
      <div className="content">
        <div className="who-we-are">
          <h2 className="our">Who We Are</h2>
          <p className="who-we-are-text">
            At Kevent, we are a team of passionate individuals dedicated to simplifying event management for academic and professional communities. Our platform is specifically designed to
            meet the needs of Kathmandu University's departments, making event scheduling, registration, and attendance seamless and efficient. By leveraging technology, we aim to enhance
            engagement, streamline event organization, and create a better experience for both event organizers and participants. We believe that by providing a user-friendly, feature-rich
            platform, we can help foster stronger connections within our campus and beyond.
          </p>
        </div>
        <div className="our-mission">
          <h2 className="our">Our Mission</h2>
          <p className="our-mission-text">
            Our mission is to empower event organizers with the tools they need to create successful, well-attended events, while offering attendees an easy and a way to discover, register
            for, and participate in them. With features like real-time updates, a calendar view, and seamless ticket booking with QR code verification, we strive to make every event
            memorable. Our vision is to build a dynamic community where information flows freely, and everyone has access to events that enhance their academic and professional journey.
            Whether you're hosting a seminar, a workshop Kevent is here to help you organize and experience events like never before.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
