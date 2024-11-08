import { useState, React } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification/Notification";

const Navbar = () => {
  return (
    <>
      <header className="navigation">
        <Link to={"/"} className="navigation_name">
          KEVENT
        </Link>
        <Notification />

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
