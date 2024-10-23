import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./userProfile.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Navbar/Navbar";

const UserProfile = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default UserProfile;
