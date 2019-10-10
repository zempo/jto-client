import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";

const MenuModal = ({ payload, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal-menu">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner-menu ${isShowing}`}>
          <nav className="fullscreen-nav">
            <NavLink onClick={hide} exact activeClassName="active" to="/guide">
              <h3>Start</h3>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/private">
              <h3>Create</h3>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/gallery">
              <h3>Browse</h3>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/support">
              <h3>Support</h3>
            </NavLink>
          </nav>
          <button className="close-modal" onClick={hide}>
            X
          </button>
        </div>
      </div>,
      document.querySelector("#menu-modal")
    );
  } else {
    return null;
  }
};

export default MenuModal;
