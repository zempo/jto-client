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
        <h3>
          {this.context.value.user.user_name}
          <Hyph />
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </h3>
      </div>
    );
  }

  renderLoginLink() {
    // window.location.reload();
    // console.log("reload");
    return (
      <div className="logged-out">
        <h3>
          <Link to="/login">Login</Link>
          <Hyph />
          <Link to="/register">Register</Link>
        </h3>
      </div>
    );
  }

  render() {
    return (
      <nav className="jto-nav-menu">
        <Link to="/">
          <img src={Logo} alt="site logo" width="50" height="50" />
        </Link>
        <Link to="/gallery">
          <h3>Gallery</h3>
        </Link>
        <Link to="/private">
          <h3>My Occasions</h3>
        </Link>
        <Link to="/faq">
          <h3>Help & FAQs</h3>
        </Link>
        {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    );
  }
}

export default Nav;
