import React, { Component } from "react";
import Doc from "../../services/exports/download-service";
import { UserContext } from "../../contexts/UserContext";
import { ThemeStyles } from "../Utils/Store/Themes";
import { JtoSection, Loader } from "../Utils/Utils";
// import DownloadContent from "../Utils/Card/DownloadContent";
// import { PDFExport } from "@progress/kendo-react-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./css/Download.css";
import Indie from "../Utils/Card/Download/Indie";

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontText: "#000000",
      frontBg: "#f8f5f5",
      innerLeftText: "#000000",
      innerLeftBg: "#f8f5f5",
      innerRightText: "#000000",
      innerRightBg: "#f8f5f5",
      border: "#000000",
      stroke: 2,
      size: "A7",
      name: "",
      close: "",
      loading: false,
      card: {
        front_message: "",
        front_image: "",
        inside_message: "",
        inside_image: "",
        theme: "",
        user: {}
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  pdfExportComponent;
  createPdf = (html) => Doc.createPdf(html);
  static contextType = UserContext;

  handleChange(e) {
    const { name, value, type, checked } = e.target;
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
  }

  handleReset(e) {
    e.preventDefault();

    this.setState({
      frontText: "#000000",
      frontBg: "#f8f5f5",
      innerLeftText: "#000000",
      innerLeftBg: "#f8f5f5",
      innerRightText: "#000000",
      innerRightBg: "#f8f5f5",
      border: "#000000",
      stroke: 2,
      size: "A7"
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { theme, front_message, front_image, inside_message, inside_image, user } = this.props.location.state.payload;
    this.setState({ card: { theme, front_message, front_image, inside_message, inside_image, user } });
  }

  render() {
    let {
      frontBg,
      frontText,
      innerLeftText,
      innerLeftBg,
      innerRightText,
      innerRightBg,
      border,
      stroke,
      size,
      card,
      close,
      name
    } = this.state;
    let { user: card_user } = this.context.value;
    let outputStyle = {
      // border: `${stroke}px solid ${border}`,
    };
    let pageStyle = {
      fontFamily: `${card.theme !== "" ? ThemeStyles[`${card.theme}`].all.fontFamily : "none"}`,
      fontSize: `${size === "A1" ? "14" : size === "A6" ? "18" : size === "A7" ? "20" : size === "A9" ? "22" : "16"}px`,
      border: `${stroke}px solid ${border}`,
      outline: `${stroke}px solid ${border}`,
      outlineOffset: `-${stroke}px`,
      height: `${
        size === "A1" ? "480" : size === "A6" ? "576" : size === "A7" ? "672" : size === "A9" ? "816" : "830"
      }px`,
      width: `${
        size === "A1" ? "336" : size === "A6" ? "348" : size === "A7" ? "480" : size === "A9" ? "528" : "600"
      }px`
    };

    return (
      <div>
        <h1 className="animated-h1">Download an Occasion</h1>
        <h2 className="animated-h2">
          From {card_user.user_name === card.user.user_name ? "You" : card.user.user_name}
        </h2>
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
                  <input type="radio" name="size" value="A1" checked={size === "A1"} onChange={this.handleChange} />
                  A1
                </label>
                <label>
                  <input type="radio" name="size" value="A6" checked={size === "A6"} onChange={this.handleChange} />
                  A6
                </label>
                <label>
                  <input type="radio" name="size" value="A7" checked={size === "A7"} onChange={this.handleChange} />
                  A7
                </label>
                <label>
                  <input type="radio" name="size" value="A9" checked={size === "A9"} onChange={this.handleChange} />
                  A9
                </label>
              </div>
            </fieldset>
            <fieldset className="download-background">
              <legend>Background</legend>
              <div className="control-item">
                <label htmlFor="frontBg">
                  Front
                  <input type="color" id="frontBg" name="frontBg" defaultValue={frontBg} onChange={this.handleChange} />
                </label>
                <label htmlFor="innerLeftBg">
                  Inner Left
                  <input
                    type="color"
                    id="innerLeftBg"
                    name="innerLeftBg"
                    defaultValue={innerLeftBg}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="innerRightBg">
                  Inner Right
                  <input
                    type="color"
                    id="innerRightBg"
                    name="innerRightBg"
                    defaultValue={innerRightBg}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className="download-text-color">
              <legend>TextColor</legend>
              <div className="control-item">
                <label htmlFor="frontText">
                  Front
                  <input
                    type="color"
                    id="frontText"
                    name="frontText"
                    defaultValue={frontText}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="innerLeftText">
                  Inner Left
                  <input
                    type="color"
                    id="innerLeftText"
                    name="innerLeftText"
                    defaultValue={innerLeftText}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="innerRightText">
                  Inner Right
                  <input
                    type="color"
                    id="innerRightText"
                    name="innerRightText"
                    defaultValue={innerRightText}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className="download-border">
              <legend>Border</legend>
              <div className="control-item">
                <label htmlFor="border">
                  Color
                  <input type="color" id="border" name="border" defaultValue={border} onChange={this.handleChange} />
                </label>
                <label htmlFor="stroke" style={{ display: "inline-block" }}>
                  Width: <span className="counter">{stroke}</span>
                  <input
                    id="typeinp"
                    type="range"
                    min="0"
                    max="20"
                    value={stroke}
                    name="stroke"
                    onChange={this.handleChange}
                    step="1"
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className="download-signature">
              <legend>Signature</legend>
              <div className="control-item">
                <label htmlFor="close">
                  Sign-Off
                  <input type="text" name="close" placeholder="Warmly" value={close} onChange={this.handleChange} />
                </label>
                <label htmlFor="name">
                  From
                  <input type="text" name="name" placeholder="John Doe III" value={name} onChange={this.handleChange} />
                </label>
              </div>
            </fieldset>
            <fieldset className="download-buttons">
              <button className="reset-button" onClick={this.handleReset}>
                Reset
              </button>
              <button className="k-button">
                <PDFDownloadLink
                  document={<Indie card={card} styles={pageStyle} size={size} />}
                  fileName="movielist.pdf"
                  className="k-button"
                >
                  Save the Occasion
                </PDFDownloadLink>
              </button>
              {/* <button
                className="k-button"
                onClick={async (e) => {
                  e.preventDefault();
                  this.setState({ loading: true });
                  try {
                    let save = await this.pdfExportComponent.save();

                    this.setState({ loading: false });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Save the Occasion
              </button> */}
            </fieldset>
          </form>
          {this.state.loading ? <Loader /> : null}
        </JtoSection>
        <JtoSection className="export-container preview">
          <div
            className="export-pg export-front"
            style={{
              backgroundColor: frontBg,
              color: frontText,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily
            }}
          >
            <h2
              style={{
                color: frontText,
                fontFamily: pageStyle.fontFamily,
                fontSize: pageStyle.fontSize
              }}
            >
              {card.front_message}
            </h2>
            {card.front_image ? <img src={card.front_image} alt="download-cover" /> : null}
          </div>
          <div
            className="export-pg export-inside-left page-break"
            style={{
              backgroundColor: innerLeftBg,
              color: innerLeftText,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily
            }}
          >
            {/* <h3 className="download-text">{card.inside_message.replace(/\./g, <br />)}</h3> */}
            <h3
              className="download-text"
              style={{
                color: innerLeftText,
                fontFamily: pageStyle.fontFamily
              }}
            >
              {/* {card.inside_message} */}
              {card.inside_message.split(".").map((sentence, i, msg) => {
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
              })}
            </h3>
            <br />
            <p
              className="signature"
              style={{
                color: innerLeftText,
                fontFamily: pageStyle.fontFamily
              }}
            >
              {close !== "" ? `${close},` : ""}
              <br />
              {name}
            </p>
          </div>
          <div
            className="export-pg export-inside-right page-break"
            style={{
              backgroundColor: innerRightBg,
              color: innerRightText,
              height: pageStyle.height,
              width: pageStyle.width,
              border: pageStyle.border,
              fontFamily: pageStyle.fontFamily
            }}
          >
            {card.inside_image ? <img src={card.inside_image} alt="download-inside-figure" /> : null}
          </div>
        </JtoSection>
      </div>
    );
  }
}

export default DownloadPage;
