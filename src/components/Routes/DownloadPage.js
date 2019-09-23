import React, { useContext, Component } from "react";
import Doc from "../../services/exports/download-service";
import { UserContext } from "../../contexts/UserContext";
import { ThemeStyles } from "../Utils/Store/Themes";
import { JtoSection } from "../Utils/Utils";
// import DownloadContainer from "../Utils/Card/DownloadContainer";
import { PDFExport } from "@progress/kendo-react-pdf";

class DownloadPage extends Component {
  pdfExportComponent;
  createPdf = (html) => Doc.createPdf(html);
  static contextType = UserContext;

  render() {
    let { user: card_user } = this.context.value;
    const { theme, front_message, front_image, inside_message, inside_image, user } = this.props.location.state.payload;

    return (
      <div>
        <h1 className="animated-h1">Download an Occasion</h1>
        <h2 className="animated-h2">From {card_user.user_name === user.user_name ? "You" : user.user_name}</h2>
        <JtoSection className="download-controls">
          <button
            className="k-button"
            onClick={() => {
              this.pdfExportComponent.save();
            }}
          >
            Export PDF
          </button>
        </JtoSection>

        <PDFExport
          // createPdf={this.createPdf}
          forcePageBreak=".page-break"
          ref={(component) => (this.pdfExportComponent = component)}
          style={theme ? ThemeStyles[`${theme}`].all : null}
        >
          <div className="export-pg export-front">
            <h3>{front_message}</h3>
            <img src={front_image} alt="download-cover" />
          </div>
          <div className="export-pg export-inside-left page-break">
            <p>{inside_message}</p>
          </div>
          <div className="export-pg export-inside-right page-break">
            <img src={inside_image} alt="download-inside-figure" />
          </div>
        </PDFExport>
        {/* <DownloadContainer
          createPdf={createPdf}
          forcePageBreak={Doc.forcePageBreak}
          style={theme ? ThemeStyles[`${theme}`].all : null}
        >
          <div className="export-pg export-front">
            <h3>{front_message}</h3>
            <img src={front_image} alt="download-cover" />
          </div>
          <div className="export-pg export-inside-left page-break">
            <p>{inside_message}</p>
          </div>
          <div className="export-pg export-inside-right page-break">
            <img src={inside_image} alt="download-inside-figure" />
          </div>
        </DownloadContainer> */}
      </div>
    );
  }
}

export default DownloadPage;
