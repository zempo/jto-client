import React from "react";
import PropTypes from "prop-types";

function Header(props) {
  return (
    <header className="App-header">
      <p>
        <i className="fa fa-user" /> <code>Hello, Boilerplate</code>
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </header>
  );
}

Header.propTypes = {};

export default Header;
