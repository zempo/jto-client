import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import { Hyph } from '../components/Utils/Utils'
import { UserContext } from "../contexts/UserContext";


const MenuModal = ({ isShowing, hide }) => {

  const { value: { user, error } } = useContext(UserContext)

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    window.scrollTo(0, 0)
    hide()
  };

  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal-menu">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner-menu ${isShowing}`}>
          <nav className="fullscreen-nav">
            <NavLink onClick={hide} exact activeClassName="active" to="/">
              <h1>Main</h1>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/guide">
              <h1>Start</h1>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/private">
              <h1>Create</h1>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/gallery">
              <h1>Browse</h1>
            </NavLink>
            <NavLink onClick={hide} exact activeClassName="active" to="/support">
              <h1>Support</h1>
            </NavLink>
            {TokenService.hasAuthToken() && error !== 401 ? (<div className="logged-in auth-link">
              <h1>
                <i className="far fa-user-circle"></i>
                <Hyph />
                <Link onClick={handleLogoutClick} to="/">
                  Logout
          </Link>
              </h1>
            </div>) : (<div className="logged-out auth-link">
              <h1>
                <NavLink onClick={hide} exact activeClassName="active-auth" to="/login">
                  Login
          </NavLink>
                <Hyph />
                <NavLink onClick={hide} exact activeClassName="active-auth" to="/register">
                  Register
          </NavLink>
              </h1>
            </div>)}
          </nav>
          {TokenService.hasAuthToken() ? <h2 className="modal-header">Logged in as "{user.user_name && user.user_name.length > 15 ? `${user.user_name.slice(0, 15)}...` : user.user_name}"</h2> : null}
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
