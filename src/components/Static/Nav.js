import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Hyph } from "../Utils/Utils";
import { UserContext } from "../../contexts/UserContext";
import Logo from "../../images/jto-logo.svg";
import "./css/Static.css";

class Nav extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    // console.log(TokenService.getId());
    // window.location.reload();
    return (
      <div className="logged-in">
        {this.context.value.user.user_name}
        <Hyph />
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    // window.location.reload();
    // console.log("reload");
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
      <nav className="jto-nav-menu">
        <Link to="/">
          <img src={Logo} alt="site logo" width="50" height="50" />
        </Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/private">My Occasions</Link>
        <Link to="/faq">Help & FAQs</Link>
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    );
  }
}

export default Nav;
