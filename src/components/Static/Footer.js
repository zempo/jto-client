import React from "react";

const Footer = () => {
  // add a scroll to top button, additional map menu, eventual site map, and custom signature

  return (
    <footer className="jto-footer">
      <h2>Just the Occasion</h2>
      <h3 className="sig-p">
        &copy; 2020
        <a
          className="signature"
          href="https://solomonzelenko.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src='https://i.imgur.com/LlMXxEm.png' alt="Solomon Zelenko" />
        </a>
      </h3>
    </footer>
  );
};

export default Footer;
