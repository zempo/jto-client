import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  validateFrontMessage,
  validateTheme,
  validateInsideMessage
} from "../../../services/validation/card-validation";
import { useForm } from "../../../hooks/get-files";
import Lock from "../../../images/Lock";
import { Required, ThemesList } from "../../Utils/Utils";
import { ThemeStyles } from "../../Utils/Store/Themes";
import "../css/Forms.css";

const Demo = ({ cancel }) => {
  const [active, setActive] = useState(false);
  // eslint-disable-next-line
  const { values, files, errors, handleChange, reset } = useForm(
    { frontMessage: "", insideMessage: "", theme: "" },
    { 1: [], 3: [], 5: [] },
    { frontImage: "", insideImage: "" },
    { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
  );
  const [validReq, setValidReq] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const frontMsgRef = useRef();
  const insideMsgRef = useRef();
  const themeRef = useRef();
  const modalRef = useRef();
  const demoRef = useRef();

  useEffect(() => {
    if (errors["1"].length > 0 || errors["3"].length > 0) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { frontMessage, insideMessage, theme } = values;
    setActive(true);

    let modal = modalRef.current.offsetParent;
    let posY = demoRef.current.offsetTop;

    modal.scrollTo(0, posY);
  };

  return (
    <>
      <form ref={modalRef} className="jto-form demo-card-form" onSubmit={handleSubmit}>
        <fieldset>
          <div className="question-text">
            <label htmlFor="frontMessage">
              <Required met={values.frontMessage.length === 0 ? false : true} />
              What's the Occassion?
            </label>
            <ul>
              {errors["1"].map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <input
              ref={frontMsgRef}
              type="text"
              placeholder="Happy Occasion Day!"
              id={1}
              name="frontMessage"
              onChange={handleChange}
              value={values.frontMessage}
            />
          </div>
          <div className="question-file">
            <label htmlFor="frontImage">Image on the front?</label>
            <Lock />
            <NavLink exact activeClassName="active-auth" to="/register">
              Register
            </NavLink>
            <br />
          </div>
          <div className="question-text">
            <label htmlFor="insideMessage">
              <Required met={values.insideMessage.length === 0 ? false : true} />
              What do you want to say inside the card?
            </label>
            <ul>
              {errors["3"].map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <textarea
              ref={insideMsgRef}
              placeholder="From yours, truly!"
              name="insideMessage"
              onChange={handleChange}
              id={3}
              value={values.insideMessage}
            />
          </div>
          <div className="question-file">
            <label htmlFor="frontImage">Image on the inside?</label>

            <Lock />
            <NavLink exact activeClassName="active-auth" to="/register">
              Register
            </NavLink>
            <br />
          </div>
          <div className="question-select">
            <Required met={values.theme.length === 0 ? false : true} />
            <select
              ref={themeRef}
              className="themes"
              value={values.theme}
              name="theme"
              id={5}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Please Choose Font...
              </option>
              <ThemesList />
            </select>
          </div>
        </fieldset>
        <button
          id="demo-card-btn"
          className="modal-btn action"
          disabled={
            !validReq ||
            frontMsgRef.current.value.length === 0 ||
            insideMsgRef.current.value.length === 0 ||
            themeRef.current.value.length === 0
          }
          type="submit"
        >
          Create Occasion
        </button>
      </form>
      <button className="close-modal" onClick={cancel}>
        X
      </button>

      <div className="list-card-demo" ref={demoRef} style={{ display: active ? "block" : "hidden" }}>
        <input type="checkbox" id={`demo-card-toggle-1`} className="demo-card-toggle" value="selected" />
        <label
          className="demo-card-container"
          htmlFor={`demo-card-toggle-1`}
          style={values.theme ? ThemeStyles[`${values.theme}`].all : null}
        >
          <span className="demo-checkmark" />
          <div className="front-demo face-demo">
            <h3>{values.frontMessage}</h3>
            <img src="https://picsum.photos/id/858/500/400?grayscale" alt="Random demo cover" />
          </div>
          <div className="inner-left-demo face-demo">
            <p>{values.insideMessage}</p>
          </div>
          <div className="inner-right-demo face-demo">
            <img src="https://picsum.photos/id/858/500/500" alt="Random demo interior" />
          </div>
        </label>
      </div>
    </>
  );
};

export default Demo;
