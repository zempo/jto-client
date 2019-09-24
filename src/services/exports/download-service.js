import { savePDF } from "@progress/kendo-react-pdf";

class DocService {
  forcePageBreak = ".page-break";
  createPdf = (html) => {
    savePDF(html, {
      paperSize: "A5",
      fileName: "my-occasion.pdf",
      margin: 3
    });
  };
  formatInnerMessage = (msg) => {
    let processedMsg = "";
    msg.split().forEach((char) => {
      if (char === ".") {
        return;
      }
    });
  };
}

const Doc = new DocService();
export default Doc;
