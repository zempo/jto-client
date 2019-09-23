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
}

const Doc = new DocService();
export default Doc;
