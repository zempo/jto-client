import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { UserContext } from "../../contexts/UserContext";
import { CardContext } from "../../contexts/CardContext";
import { ThemeStyles } from "../Utils/Store/Themes";
import { JtoSection, Loader } from "../Utils/Utils";
import "./css/Download.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const DownloadPage = (props) => {
  const {
    value: { user: card_user }
  } = useContext(UserContext);
  const {
    value: { anyCard: card, anyCardId, setAnyCardId, userName }
  } = useContext(CardContext);
  const {
    value: { winHgt, winWidth }
  } = useContext(ThemeContext);
  const [currentId, setCurrentId] = useState(0);
  const [frontTxt, setFrontTxt] = useState("#000000");
  const [frontBg, setFrontBg] = useState("#f8f5f5");
  const [leftTxt, setLeftTxt] = useState("#000000");
  const [leftBg, setLeftBg] = useState("#f8f5f5");
  const [rightBg, setRightBg] = useState("#f8f5f5");
  const [border, setBorder] = useState("#000000");
  const [stroke, setStroke] = useState(2);
  const [size, setSize] = useState("A7");
  const [name, setName] = useState("");
  const [close, setClose] = useState("");
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setAnyCardId(item);
      setCurrentId(item);
    } else {
    }
    // eslint-disable-next-line
  }, [anyCardId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(e.currentTarget);

    if (type === "checkbox") {
      setSize(checked);
    } else if (name === "frontTxt") {
      setFrontTxt(value);
    } else if (name === "frontBg") {
      setFrontBg(value);
    } else if (name === "leftTxt") {
      setLeftTxt(value);
    } else if (name === "leftBg") {
      setLeftBg(value);
    } else if (name === "rightBg") {
      setRightBg(value);
    } else if (name === "border") {
      setBorder(value);
    } else if (name === "stroke") {
      setStroke(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "close") {
      setClose(value);
    } else if (name === "size") {
      setSize(value);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFrontTxt("#000000");
    setFrontBg("#f8f5f5");
    setLeftTxt("#000000");
    setLeftBg("#f8f5f5");
    setRightBg("#f8f5f5");
    setBorder("#000000");
    setStroke(2);
    setSize("A7");
  };

  let pageStyle = {
    fontFamily: `${card.theme ? ThemeStyles[`${card.theme}`].all.fontFamily : "none"}`,
    fontSize: `${size === "A1" ? "14" : size === "A6" ? "18" : size === "A7" ? "20" : size === "A9" ? "22" : "16"}px`,
    fontSizeInner: `${
      size === "A1" ? "10" : size === "A6" ? "12" : size === "A7" ? "14" : size === "A9" ? "16" : "16"
    }px`,
    border: `${stroke}px solid ${border}`,
    outline: `${stroke}px solid ${border}`,
    outlineOffset: `-${stroke}px`,
    height: `${
      size === "A1" ? "480" : size === "A6" ? "576" : size === "A7" ? "672" : size === "A9" ? "816" : "830"
    }px`,
    width: `${size === "A1" ? "336" : size === "A6" ? "348" : size === "A7" ? "480" : size === "A9" ? "528" : "600"}px`,
    // 1056
    marginBottom: `${
      size === "A1" ? "586" : size === "A6" ? "490" : size === "A7" ? "394" : size === "A9" ? "250" : "300"
    }px`
  };

  return (
    <div>
      <h1 className="animated-h1">Download an Occasion</h1>
      <h2 className="animated-h2">From {userName && card_user.user_name === userName ? "You" : userName}</h2>
      <JtoSection className="download-controls">
        <form className="jto-download-form">
          <fieldset className="download-size">
            <legend>
              Size (
              {size === "A1"
                ? "5'' x 3.5''"
                : size === "A6"
                ? "6'' x 4''"
                : size === "A7"
                ? "7'' x 5''"
                : size === "A9"
                ? "8.5'' x 5.5''"
                : ""}
              )
            </legend>
            <div className="control-item">
              <label>
                A1 <br />
                <input type="radio" name="size" value="A1" checked={size === "A1"} onChange={handleChange} />
              </label>
              <label>
                A6 <br />
                <input type="radio" name="size" value="A6" checked={size === "A6"} onChange={handleChange} />
              </label>
              <label>
                A7 <br />
                <input type="radio" name="size" value="A7" checked={size === "A7"} onChange={handleChange} />
              </label>
              <label>
                A9 <br />
                <input type="radio" name="size" value="A9" checked={size === "A9"} onChange={handleChange} />
              </label>
            </div>
          </fieldset>
          <fieldset className="download-background">
            <legend>Background</legend>
            <div className="control-item">
              <label htmlFor="frontBg">
                Front <br />
                <input type="color" id="frontBg" name="frontBg" value={frontBg} onChange={handleChange} />
              </label>
              <label htmlFor="leftBg">
                Inner L <br />
                <input type="color" id="leftBg" name="leftBg" value={leftBg} onChange={handleChange} />
              </label>
              <label htmlFor="rightBg">
                Inner R <br />
                <input type="color" id="rightBg" name="rightBg" value={rightBg} onChange={handleChange} />
              </label>
            </div>
          </fieldset>
          <fieldset className="download-text-color">
            <legend>TextColor</legend>
            <div className="control-item">
              <label htmlFor="frontTxt">
                Front <br />
                <input type="color" id="frontTxt" name="frontTxt" value={frontTxt} onChange={handleChange} />
              </label>
              <label htmlFor="leftTxt">
                Inner <br />
                <input type="color" id="leftTxt" name="leftTxt" value={leftTxt} onChange={handleChange} />
              </label>
            </div>
          </fieldset>
          <fieldset className="download-border">
            <legend>Border</legend>
            <div className="control-item">
              <label htmlFor="border">
                Color <br />
                <input type="color" id="border" name="border" value={border} onChange={handleChange} />
              </label>
              <label htmlFor="stroke" style={{ display: "inline-block" }}>
                Width - <span className="counter">{stroke}</span>
                <input
                  id="typeinp"
                  type="range"
                  min="0"
                  max="15"
                  value={stroke}
                  name="stroke"
                  onChange={handleChange}
                  step="1"
                />
              </label>
            </div>
          </fieldset>
          <fieldset className="download-signature">
            <legend>Signature</legend>
            <div className="control-item">
              <label htmlFor="close">
                Sign-Off <br />
                <input type="text" name="close" placeholder="Warmly," value={close} onChange={handleChange} />
              </label>
              <label htmlFor="name">
                From <br />
                <input type="text" name="name" placeholder="John Doe III" value={name} onChange={handleChange} />
              </label>
            </div>
          </fieldset>
          <fieldset className="download-buttons">
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button className="action" onClick={(e) => e.preventDefault()}>
              {winWidth > 900 ? (
                <ReactToPrint
                  trigger={() => <a href="javascript:void(0);">Save the Occaison</a>}
                  content={() => componentRef.current}
                />
              ) : (
                <ReactToPrint
                  trigger={() => <a href="javascript:void(0);">Save</a>}
                  content={() => componentRef.current}
                />
              )}
            </button>
          </fieldset>
        </form>
        <h2>
          Card Assembly Instructions{" "}
          <Link title="link to instructions page" to="/guide">
            Here
          </Link>
        </h2>
      </JtoSection>
      <JtoSection className="jto-export">
        <div className="export-container preview" ref={componentRef}>
          <div
            className="export-pg export-front"
            style={{
              backgroundColor: frontBg,
              color: frontTxt,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily,
              marginBottom: pageStyle.marginBottom
            }}
          >
            <h2
              style={{
                color: frontTxt,
                fontFamily: pageStyle.fontFamily,
                fontSize: pageStyle.fontSize
              }}
            >
              {card.front_message}
            </h2>
            {card.front_image ? <img src={card.front_image} alt="download-cover" /> : null}
          </div>
          <div
            className="export-pg export-inside-left"
            style={{
              backgroundColor: leftBg,
              color: leftTxt,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily,
              marginBottom: pageStyle.marginBottom
            }}
          >
            <h3
              className="download-text"
              style={{
                color: leftTxt,
                fontFamily: pageStyle.fontFamily,
                fontSize: pageStyle.fontSizeInner
              }}
            >
              {card.inside_message
                ? card.inside_message.split(".").map((sentence, i, msg) => {
                    if (i === msg.length - 1) {
                      return (
                        <div key={i}>
                          <span>{sentence}</span>
                          <br />
                        </div>
                      );
                    } else {
                      return (
                        <div key={i}>
                          <span>{sentence}</span>.
                          <br />
                        </div>
                      );
                    }
                  })
                : null}
            </h3>
            <br />
            <p
              className="signature"
              style={{
                color: leftTxt,
                fontFamily: pageStyle.fontFamily,
                fontSize: pageStyle.fontSizeInner
              }}
            >
              {close !== "" ? `${close}` : ""}
              <br />
              {name}
            </p>
          </div>
          <div
            className="export-pg export-inside-right page-break"
            style={{
              backgroundColor: rightBg,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily,
              marginBottom: pageStyle.marginBottom
            }}
          >
            {card.inside_image ? <img src={card.inside_image} alt="download-inside-figure" /> : null}
          </div>
          <div
            className="export-pg page-break"
            style={{
              backgroundColor: rightBg,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily,
              marginBottom: pageStyle.marginBottom
            }}
          ></div>
        </div>
      </JtoSection>
    </div>
  );
};

export default DownloadPage;
