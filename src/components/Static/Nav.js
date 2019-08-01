import React from "react";
import { Link } from "react-router-dom";
import "./css/Static.css";

function Nav(props) {
  return (
    <nav className="jto-nav">
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/private-gallery">My Occasions</Link>
      <Link to="/add-occasion">New Occasion</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
    </nav>
  );
}

export default Nav;
