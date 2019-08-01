import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Hyph } from "../Utils/Utils";
import "./css/Static.css";

class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    console.log(TokenService.getId());
    // window.location.reload();
    return (
      <div className="logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    // window.location.reload();
    console.log("reload");
    return (
      <div className="logged-out">
        <Link to="/login">Login</Link>
        <Hyph />
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <nav className="jto-nav">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/private">My Occasions</Link>
        <Link to="/add-occasion">New Occasion</Link>
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    );
  }
}

//  function Nav(props) {
//   const handleLogoutClick = () => {
//     TokenService.clearAuthToken();
//     TokenService.clearCallbackBeforeExpiry();
//     IdleService.unRegisterIdleResets();
//   };

//   const renderLogoutLink = () => {
//     const LogoutLink = (
//       <div className="logged-in">
//         <Link onClick={handleLogoutClick} to="/logout">
//           Logout
//         </Link>
//       </div>
//     );
//     return LogoutLink;
//   };
//   const renderLoginLink = () => {
//     const LoginLink = (
//       <div className="logged-out">
//         <Link to="/login">Login</Link>
//         <Link to="/register">Sign Up</Link>
//       </div>
//     );

//     return LoginLink;
//   };

export default Nav;
