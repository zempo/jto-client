import React from "react";
import Signature from "../../images/signature.svg";

const Footer = () => {
  // add a scroll to top button, additional map menu, eventual site map, and custom signature

  return (
    <footer className="jto-footer">
      <h1>Just the Occasion</h1>
      <h2 className="sig-p">
        From
        <a
          className="signature"
          href="https://solomonzelenko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Signature} alt="Solomon Zelenko" />
        </a>
      </h2>
    </footer>
  );
};

export default Footer;
