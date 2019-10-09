import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/jto-logo-main.svg";
import Pic1 from "../../images/section1.gif";
import Pic2 from "../../images/section2.gif";
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
        <img className="landing-img" src={Pic1} alt="Screenshot of your private occasions page."></img>
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
        <img
          className="landing-img"
          src={Pic2}
          alt="Screenshot of download page. Control size, colors, and borders."
        ></img>
        <p>
          {" "}
          Print occasions from the gallery and your private page.
          <br />
          Add a personal touch, everytime!
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

        <p>You can even copy your favorites!</p>
      </section>
      <section>
        <h3>Give it a Try!</h3>
        <button className="modal-btn action" onClick={toggleDemo}>
          Demo
        </button>
        <Modal isShowing={isShowingDemo} hide={toggleDemo} action="demo" />
      </section>
      <section>
        <NavLink exact activeClassName="active-auth" to="/register">
          <h3>Get Started</h3>
        </NavLink>
      </section>
    </JtoSection>
  );
};

export default Landing;
