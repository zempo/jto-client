import React, { useEffect } from "react";
import Logo from "../../images/jto-logo.svg";

const Landing = (props) => {
  return (
    <div className="jto-landing">
      <img src={Logo} alt="jto-logo" width="100" height="100" />
      <section>
        <h3>Experience the Greeting Card Platform</h3>
        <p>
          [<em>placeholder for screenshot of the interface</em>]
        </p>
        <p>
          {" "}
          Experience the greeting card ideas you've always wanted to bring to life.
          <br /> You'll discover a platform that celebrates your sentiments, quirks, and condolances.
        </p>

        <p> It only takes a few clicks to create &#10231; publish &#10231; store.</p>
      </section>
      <section>
        <h3>Fast &#10231; Personal &#10231; Easy</h3>
        <p>
          [<em>placeholder for screenshot of card generation component</em>]
        </p>
        <p>
          {" "}
          With a wide variety of templates, we've made the process of sizing, layout, and printing a two-step process.{" "}
          <br /> Your card is ready to go.
        </p>

        <p>Please send us a "Thank You" card, if you get the chance? </p>
      </section>
      <section>
        <h3>Protect &#10231; Update &#10231; Download</h3>

        <p>
          [<em>placeholder for screenshot of card update/delete component</em>]
        </p>
        <p>
          [<em>placeholder for screenshot of layout/download component</em>]
        </p>
        <p />
      </section>
      <section>
        <h3>DEMO</h3>
        <p>
          [<em>Demo is click to scroll</em>]
        </p>
        <p>
          [<em>Interactive Interface using local storage</em>]
        </p>
        <p>
          [<em>Uses create card form, without add-image functionality. Uses lorem picsum.</em>]
        </p>
      </section>
      <section>
        <h3>Registration Form</h3>
      </section>
    </div>
  );
};

export default Landing;
