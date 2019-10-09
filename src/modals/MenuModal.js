import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";

const MenuModal = ({ payload, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal-menu">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner-menu ${isShowing}`}>
          <h1>Menu</h1>
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
