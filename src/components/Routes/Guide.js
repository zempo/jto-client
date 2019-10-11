import React, { useEffect } from "react";
import { JtoSection, Required } from "../Utils/Utils";
import "./css/Info.css";

const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <JtoSection className="jto-guide">
      <h1 className="animated-h1">Getting Started</h1>
      <h2 className="animated-h2">Create</h2>
      <ol className="jto-list">
        <li>Inspiration and Resources</li>
        <ul>
          <li>
            <Required met="true"></Required> For Images - try the free software{" "}
            <a
              href="https://www.photopea.com"
              className="guide-link"
              title="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Photopea.
            </a>
          </li>
          <li>
            <Required met="true"></Required> For Messages - try some of these{" "}
            <a
              href="https://www.pinterest.com/tlsprincipal/card-sentiments-and-messages/"
              className="guide-link"
              title="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pinterest Pins.
            </a>
          </li>
          <li>
            <Required met="true"></Required> For Messages - find a list of occasions and more at &nbsp;
            <a
              href="https://www.calendarlabs.com/holidays/countries/"
              className="guide-link"
              title="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Calendar Labs.
            </a>
          </li>
          <li>
            <Required met="true"></Required> For Vector Images - try an open-source illustration software{" "}
            <a
              href="https://inkscape.org/release/inkscape-0.92.4/"
              className="guide-link"
              title="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inkscape
            </a>{" "}
            <br /> and image-tracing tracing tutorial{" "}
            <a
              href="https://www.youtube.com/watch?v=s-kPg4vYKfk"
              className="guide-link"
              title="turn any image into a cartoon"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>{" "}
          </li>
        </ul>
        <li>Design Process</li>
        <ul>
          <li>
            <Required met="true"></Required> Prepare your custom message (and image, if desired).
          </li>
          <li>
            <Required met="true"></Required> Click the "add-occasion" button
          </li>
          <li>
            <Required met="true"></Required> Add your messages and pictures
          </li>
          <li>
            {" "}
            <Required met="true"></Required> Done{" "}
          </li>
        </ul>
      </ol>
      <h2 className="animated-h2">Send</h2>
      <ol className="jto-list">
        <li>Click on a card.</li>
        <li>Click the download icon.</li>
        <p>Or...</p>
        <li>Access the download menu, here.</li>
        <ul>
          <li>Download will let you save a copy of the card.</li>
          <li>Copy will copy the card to your homepage.</li>
          <li>Email will email a card to someone (feature is coming soon).</li>
        </ul>
      </ol>
      <h2 className="animated-h2">Prepare</h2>
      <li>Clicking download will take you to the editor. Add any last-minute styles.</li>
      <ul>
        <li>You can customize a card's borders, background, size, and text.</li>
        <li>
          Read more,
          <a
            href="https://www.calendarlabs.com/holidays/countries/"
            className="guide-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </li>
      </ul>
      <h2 className="animated-h2">Download</h2>
    </JtoSection>
  );
};

export default Guide;
