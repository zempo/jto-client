import React, { Component } from "react";
import ReactDOM from "react-dom";
import Doc from "../../services/exports/download-service";
import { UserContext } from "../../contexts/UserContext";
import { ThemeStyles } from "../Utils/Store/Themes";
import { JtoSection } from "../Utils/Utils";
// import DownloadContent from "../Utils/Card/DownloadContent";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "./css/Download.css";

class DownloadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperSize: "A5",
      frontText: "#000000",
      frontBg: "#f8f5f5",
      innerLeftText: "#000000",
      innerLeftBg: "#f8f5f5",
      innerRightText: "#000000",
      innerRightBg: "#f8f5f5",
      border: "#f8f5f5",
      stroke: 5,
      size: "A7",
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
  }

  pdfExportComponent;
  createPdf = (html) => Doc.createPdf(html);
  static contextType = UserContext;

  handleChange(e) {
    const { name, value, type, checked } = e.target;
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
  }

  componentDidMount() {
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
      card
    } = this.state;
    let { user: card_user } = this.context.value;
    let outputStyle = {
      // border: `${stroke}px solid ${border}`,
    };
    let pageStyle = {
      fontFamily: `${card.theme !== "" ? ThemeStyles[`${card.theme}`].all.fontFamily : "none"}`,
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
            <fieldset className="download-text-color">
              <legend>Text Color</legend>
              <input
                type="color"
                id="frontText"
                name="frontText"
                defaultValue={frontText}
                onChange={this.handleChange}
              />
              <label htmlFor="frontText">Front</label>
              <input
                type="color"
                id="innerLeftText"
                name="innerLeftText"
                defaultValue={innerLeftText}
                onChange={this.handleChange}
              />
              <label htmlFor="innerLeftText">Inner Left</label>
              <input
                type="color"
                id="innerRightText"
                name="innerRightText"
                defaultValue={innerRightText}
                onChange={this.handleChange}
              />
              <label htmlFor="innerRightText">Inner Right</label>
            </fieldset>
            <fieldset className="download-background">
              <legend>Background</legend>
              <input type="color" id="frontBg" name="frontBg" defaultValue={frontBg} onChange={this.handleChange} />
              <label htmlFor="frontBg">Front</label>
              <input
                type="color"
                id="innerLeftBg"
                name="innerLeftBg"
                defaultValue={innerLeftBg}
                onChange={this.handleChange}
              />
              <label htmlFor="innerLeftBg">Inner Left</label>
              <input
                type="color"
                id="innerRightBg"
                name="innerRightBg"
                defaultValue={innerRightBg}
                onChange={this.handleChange}
              />
              <label htmlFor="innerRightBg">Inner Right</label>
            </fieldset>
            <fieldset className="download-border">
              <legend>Border</legend>
              <input type="color" id="border" name="border" defaultValue={border} onChange={this.handleChange} />
              <label htmlFor="border">Border Color</label>
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
              <label htmlFor="stroke" style={{ display: "inline-block" }}>
                Border Width -- {stroke}
              </label>
            </fieldset>
            <fieldset className="download-size">
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
            </fieldset>
            <button
              className="k-button"
              onClick={(e) => {
                e.preventDefault();
                this.pdfExportComponent.save();
              }}
            >
              Save the Occasion
            </button>
          </form>
        </JtoSection>
        <JtoSection className="export-container">
          <PDFExport
            // createPdf={this.createPdf}
            forcePageBreak=".page-break"
            paperSize="letter"
            fileName="my-occasion.pdf"
            margin="20px"
            ref={(component) => (this.pdfExportComponent = component)}
            style={outputStyle}
          >
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
              <h2>{card.front_message}</h2>
              <img src={card.front_image} alt="download-cover" />
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
              <h3 className="download-text">{card.inside_message}</h3>
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
              <img src={card.inside_image} alt="download-inside-figure" />
            </div>
          </PDFExport>
        </JtoSection>
      </div>
    );
  }
}

export default DownloadPage;
