import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/jto-logo-main.svg";
import Pic1 from "../../images/section1.gif";
import Pic2 from "../../images/jto-2.gif";
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
        <img className="landing-img" src={Pic1} alt="screenshot of user-page."></img>
        <p>
          Create, share, and download greeting cards on your terms. <br />
          Discover a platform that values your experiences.
        </p>
      </section>
      <section>
        <div className="revolving-header">
          <RevolvingWords words={["Quick", "Clean", "Adjust"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Personal", "Accessible", "Review"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Easy", "Ready", "Print"]} />
        </div>
        <img className="landing-img" src={Pic2} alt="screenshot of homepage"></img>
        <p>
          {" "}
          Before you download an occasion, add finishing touches.
          <br /> Enjoy the freedom to bring your occasions to life!
        </p>
        <p>
          Please send us a "Thank You" card, if you get the chance? <br />
          Speaking of...{" "}
        </p>
      </section>
      <section>
        <div className="revolving-header">
          <RevolvingWords words={["Like", "Protect", "Copy"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Comment", "Review", "Engage"]} />
          <p className="double-arrow">&#10231;</p>
          <RevolvingWords words={["Share", "Upload", "Save"]} />
        </div>
        <p>
          Want to share the occasion with a community? <br />
          Bring your occasions to the gallery!
        </p>

        <p>You can even download and copy your favorites!</p>
      </section>
      <section>
        <h3>DEMO</h3>
        <button onClick={toggleDemo}>Run Demo</button>
        <NavLink exact activeClassName="active-auth" to="/register">
          <p>Register</p>
        </NavLink>
        <Modal isShowing={isShowingDemo} hide={toggleDemo} action="demo" />
      </section>
    </JtoSection>
  );
};

export default Landing;
