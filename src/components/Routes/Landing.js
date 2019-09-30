import React, { useEffect } from "react";
import Logo from "../../images/jto-logo-main.svg";
import Pic1 from '../../images/section-2-min.png'
// import { AuthService } from "../../services/auth-service";
import { RevolvingWords, JtoSection } from "../Utils/Utils";
import { useModal } from "../../hooks/use-modal";
import Modal from "../../modals/Modal";
import "./css/Landing.css";

const Landing = (props) => {
  // const handleRefresh = (e) => {
  //   AuthService.postRefreshToken();
  // };
  const { isShowing: isShowingDemo, toggle: toggleDemo } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <JtoSection className="jto-landing">
      <h1 className="animated-h1">Just the Occasion</h1>
      <h2 className="animated-h2">The Greeting Card Platform</h2>
      <img className="main-logo" src={Logo} alt="jto-logo" />
      <div className="revolving-header">
        <RevolvingWords words={["Create", "Update", "Browse"]} />
        <p className="double-arrow">&#10231;</p>
        <RevolvingWords words={["Publish", "Download", "Comment"]} />
        <p className="double-arrow">&#10231;</p>
        <RevolvingWords words={["Share", "Store", "React"]} />
      </div>
      <section>
        <img className="landing-img" src={Pic1} alt="screenshot of homepage"></img>
        <p>
          {" "}
          Experience the greeting card ideas you've always wanted to bring to life.
          <br /> You'll discover a platform that celebrates your sentiments, quirks, and condolances.
        </p>

        <p> It only takes a few clicks to create &#10231; publish &#10231; store.</p>
      </section>
      <section>
        <div className="revolving-header">
          <RevolvingWords words={["Quick", "Clean", "Adjust"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Personal", "Accessible", "Review"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Easy", "Ready", "Print"]} />
        </div>
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
        <button onClick={toggleDemo}>Run Demo</button>
        <Modal isShowing={isShowingDemo} hide={toggleDemo} action="demo" />
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
      {/* to-do: build modal that checks if you're still logged in after 30 mins of inactivity */}
      {/* <button onClick={handleRefresh}>Refresh Checker</button> */}
    </JtoSection>
  );
};

export default Landing;
