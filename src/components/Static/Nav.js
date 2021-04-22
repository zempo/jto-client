import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { Hyph } from "../Utils/Utils";
import { UserContext } from "../../contexts/UserContext";
import Logo from "../../images/jto-logo-main.svg";
import MenuIcon from "../../images/menu-icon.svg";
import MenuModal from "../../modals/MenuModal";
import "./css/Static.css";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showing: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  static contextType = UserContext;

  toggleModal = () => {
    const { showing } = this.state;

    if (showing) {
      this.setState({ showing: false });
    } else {
      this.setState({ showing: true });
    }
  };

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    // console.log(TokenService.getId());
    // window.location.reload();

    const { user_name } = this.context.value.user;

    return (
      <div className='logged-in auth-link'>
        <h3>
          <i className='far fa-user-circle'></i> &nbsp;
          {user_name && user_name.length > 10
            ? `${user_name.slice(0, 10)}...`
            : user_name}
          <Hyph />
          <Link onClick={this.handleLogoutClick} to='/'>
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
      <div className='logged-out auth-link'>
        <h3>
          <NavLink exact activeClassName='active-auth' to='/login'>
            Login
          </NavLink>
          <Hyph />
          <NavLink exact activeClassName='active-auth' to='/register'>
            Register
          </NavLink>
        </h3>
      </div>
    );
  }

  render() {
    const { showing } = this.state;
    // let error = this.context.value.error;

    return (
      <>
        <nav className='jto-nav-menu'>
          <NavLink exact activeClassName='active' to='/'>
            <img
              className='logo-link'
              src={Logo}
              alt='homepage'
              width='70'
              height='70'
            />
          </NavLink>
          <div className='nav-menu-mini' onClick={this.toggleModal}>
            <img src={MenuIcon} alt='menu-icon' width='50' height='50' />
          </div>
          <div className='nav-menu'>
            <NavLink exact activeClassName='active' to='/guide'>
              <h3>Guide</h3>
            </NavLink>
            <NavLink exact activeClassName='active' to='/gallery'>
              <h3>Gallery</h3>
            </NavLink>
            <NavLink exact activeClassName='active' to='/dashboard'>
              <h3>Dashboard</h3>
            </NavLink>
            <NavLink exact activeClassName='active' to='/support'>
              <h3>Support</h3>
            </NavLink>
            {TokenService.hasAuthToken() && this.context.value.error !== 401
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </nav>
        <MenuModal isShowing={showing} hide={this.toggleModal} />
      </>
    );
  }
}

export default Nav;
