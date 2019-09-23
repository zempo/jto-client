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
      frontBg: "#f8f5f5",
      innerLeftBg: "#f8f5f5",
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
    let { frontBg, innerLeftBg, innerRightBg, border, stroke, size, card } = this.state;
    let { user: card_user } = this.context.value;
    let outputStyle = {
      border: `${stroke}px solid ${border}`,
      fontFamily: `${card.theme !== "" ? ThemeStyles[`${card.theme}`].all.fontFamily : "none"}`
    };

    return (
      <div>
        <h1 className="animated-h1">Download an Occasion</h1>
        <h2 className="animated-h2">
          From {card_user.user_name === card.user.user_name ? "You" : card.user.user_name}
        </h2>
        <JtoSection className="download-controls">
          <form className="jto-download-form">
            <fieldset className="download-background">
              <h3>Background</h3>
              <input type="color" id="frontBg" name="frontBg" defaultValue={frontBg} />
              <label htmlFor="frontBg">Front</label>
              <input type="color" id="innerLeftBg" name="innerLeftBg" defaultValue={innerLeftBg} />
              <label htmlFor="innerLeftBg">Inner Left</label>
              <input type="color" id="innerRightBg" name="innerRightBg" defaultValue={innerRightBg} />
              <label htmlFor="innerRightBg">Inner Right</label>
            </fieldset>
            <fieldset className="download-border">
              <h3>Border</h3>
              <input type="color" id="border" name="border" defaultValue={border} />
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
              <label htmlFor=""></label>
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
            paperSize={size}
            fileName="my-occasion.pdf"
            margin="20px"
            ref={(component) => (this.pdfExportComponent = component)}
            style={outputStyle}
          >
            <div className="export-pg export-front" style={{ backgroundColor: frontBg }}>
              <h3>{card.front_message}</h3>
              <img src={card.front_image} alt="download-cover" />
            </div>
            <div className="export-pg export-inside-left page-break" style={{ backgroundColor: innerLeftBg }}>
              <p>{card.inside_message}</p>
            </div>
            <div className="export-pg export-inside-right page-break" style={{ backgroundColor: innerRightBg }}>
              <img src={card.inside_image} alt="download-inside-figure" />
            </div>
          </PDFExport>
        </JtoSection>
      </div>
    );
  }
}

export default DownloadPage;
