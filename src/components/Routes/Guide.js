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
        <li>Create</li>
        <ul>
          <li>
            <Required met="true"></Required> Click "create", then scroll down and click on the "+" button.
          </li>
          <li>
            <Required met="true"></Required> Prepare your custom greeting on the front. And a custom message inside.
          </li>
          <li>
            <Required met="true"></Required> Don't add your signature just yet! You might want to customize it later!
          </li>
          <li>
            <Required met="true"></Required> Add an image on the front and inside (Optional).
          </li>
        </ul>
      </ol>
      <h2 className="animated-h2">Send</h2>
      <ol className="jto-list">
        <li>Click on a card.</li>
        <ul>
          <li>
            <Required met="true"></Required> "View" lets you observe the occasion.
          </li>
          <li>
            <Required met="true"></Required> "Edit" lets you make changes to your card.
          </li>
          <li>
            <Required met="true"></Required> "Publish" sends your card to the public gallery.
          </li>
          <li>
            <Required met="true"></Required> "Make Private" sends your card back to your homepage.
          </li>
          <li>
            <Required met="true"></Required> "Delete" erases an occasion permanently.
          </li>
          <br />

          <li>
            <Required met="true"></Required> "Download" lets you do a few more things...
          </li>
        </ul>
        <li>So you clicked the download icon?</li>
        <p>Or...</p>
        <br />
        <li>Accessed the download menu when viewing a card?</li>
        <ul>
          <li>
            <Required met="true"></Required> Download will let you save a copy of the card.
          </li>
          <li>
            <Required met="true"></Required> Copy will copy the card to your homepage.
          </li>
          <li>
            <Required met="true"></Required> Email will email a card to someone (feature is coming soon).
          </li>
        </ul>
      </ol>
      <h2 className="animated-h2">Download</h2>
      <ol className="jto-list">
        <li>Final Touches</li>
        <ul>
          <li>
            <Required met="true"></Required> Customize border, background, size, and text.
          </li>
          <li>
            <Required met="true"></Required> Click "Save the Occasion"
          </li>
          <li>
            <Required met="true"></Required> Download the resulting pdf
          </li>
          <li>
            <Required met="true"></Required> Cut and paste on a paper!
          </li>
        </ul>
        <li>Sizing Guide</li>
        <img
          className="guide-img"
          src="https://www.cardsforcauses.com/product_images/uploaded_images/greeting-card-sizes-infographic-1-.png"
          alt="card sizes guide."
          srcset=""
        />
        <p>
          Source:&nbsp;
          <a href="https://www.cardsforcauses.com" className="guide-link" target="_blank" rel="noopener noreferrer">
            Card For Causes
          </a>
        </p>
      </ol>
    </JtoSection>
  );
};

export default Guide;
