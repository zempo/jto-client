import React from "react";
import { JtoSection } from "../Utils/Utils";
import "./css/Info.css";

const Guide = () => {
  return (
    <JtoSection className="jto-guide">
      <h1 className="animated-h1">Getting Started</h1>
      <h2 className="animated-h2">Need to find an Occasion?</h2>
      <p>
        Check out international holidays and more at &nbsp;
        <a
          href="https://www.calendarlabs.com/holidays/countries/"
          className="guide-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calendar Labs
        </a>
      </p>
      <h2 className="animated-h2">Which Card size is right for me?</h2>
      <h2 className="animated-h2"></h2>
    </JtoSection>
  );
};

export default Guide;
