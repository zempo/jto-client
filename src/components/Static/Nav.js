import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav className="jto-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/private-gallery">My Occasions</Link>
        </li>
        <li>
          <Link to="/add-occasion">New Occasion</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
