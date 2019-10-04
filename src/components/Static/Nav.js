import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Hyph } from "../Utils/Utils";
import { UserContext } from "../../contexts/UserContext";
import Logo from "../../images/jto-logo-main.svg";
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
          <NavLink exact activeClassName="active-auth" to="/login">
            Login
          </NavLink>
          <Hyph />
          <NavLink exact activeClassName="active-auth" to="/register">
            Register
          </NavLink>
        </h3>
      </div>
    );
  }

  render() {
    let error = this.context.value.error;
    return (
      <nav className="jto-nav-menu">
        <NavLink exact activeClassName="active" to="/">
          <img className="logo-link" src={Logo} alt="homepage" width="50" height="50" />
        </NavLink>
        <NavLink exact activeClassName="active" to="/guide">
          <h3>Start</h3>
        </NavLink>
        <NavLink exact activeClassName="active" to="/private">
          <h3>Create</h3>
        </NavLink>
        <NavLink exact activeClassName="active" to="/gallery">
          <h3>Browse</h3>
        </NavLink>
        <NavLink exact activeClassName="active" to="/support">
          <h3>Support</h3>
        </NavLink>
        {TokenService.hasAuthToken() && error !== 401 ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    );
  }
}

export default Nav;
