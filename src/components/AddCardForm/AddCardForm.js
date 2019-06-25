import React, { useEffect } from "react";
import { useInput } from "../../hooks/input-hook";
import PropTypes from "prop-types";

function AddCard(props) {
  const { value: theme, bind: bindTheme, reset: resetTheme } = useInput("handwritten");
  const { value: frontMessage, bind: bindFrontMessage, reset: resetFrontMessage } = useInput("");
  const { value: frontImage, bind: bindFrontImage, reset: resetFrontImage } = useInput("");
  const { value: insideMessage, bind: bindInsideMessage, reset: resetInsideMessage } = useInput("");
  const { value: insideImage, bind: bindInsideImage, reset: resetInsideImage } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(theme, frontMessage, frontImage, insideMessage, insideImage);
    resetTheme();
    resetFrontMessage();
    resetFrontImage();
    resetInsideMessage();
    resetInsideImage();
  };

  return (
    <form className="Form Add-Form" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="frontMessage">What's the Occassion?</label>
        <input type="text" placeholder="Happy Occasion Day!" name="frontMessage" {...bindFrontMessage} />
        <label htmlFor="frontImage">Does your Occasion need a Cover Image?</label>
        <input
          type="text"
          placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
          name="frontImage"
          {...bindFrontImage}
        />
        <textarea placeholder="From yours, truly!" name="insideMessage" {...bindInsideMessage} />
        <input type="text" placeholder="https://www.your-image.com/images/1" name="frontImage" {...bindInsideImage} />
        <select className="themes" name="theme" id="theme" {...bindTheme}>
          <option value="cursive">Cursive</option>
          <option value="cursive-plus">Cursive+</option>
          <option value="handwritten">Handwritten</option>
          <option value="handwritten-bold">Handwritten Bold</option>
          <option value="indie">Indie</option>
          <option value="kiddo">Kiddo</option>
          <option value="pen">Pen</option>
          <option value="sharpie">Sharpie</option>
          <option value="robotic">Robotic</option>
          <option value="typed">Typed</option>
          <option value="quill">Quill</option>
        </select>
      </fieldset>
      <button type="submit">Create Occasion</button>
    </form>
  );
}

AddCard.propTypes = {};

export default AddCard;

// state = {
//     name: "",
//     recieptID: 0,
//     price1: 0,
//     price2: 0
//   };

//   handleChange = ({ target: { value, name } }) => {
//     this.setState({ [name]: value });
//   };
//   createAndDownloadPdf = (e) => {
//     axios
//       .post("http://localhost:8000/api/pdfs", this.state)
//       .then(() => {
//         console.log(this.state);
//         return axios.get("http://localhost:8000/api/pdfs/1", { responseType: "blob" });
//       })
//       .then((res) => {
//         const pdfBlob = new Blob([res.data], { type: "application/pdf" });

//         saveAs(pdfBlob, "newPdf.pdf");
//       });
//   };

//   render() {
//     return (
//       <div className="App">
//         <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
//         <input type="number" placeholder="Reciept ID" name="recieptID" onChange={this.handleChange} />
//         <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
//         <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
//         <button type="submit" onClick={this.createAndDownloadPdf}>
//           Download PDF
//         </button>
//       </div>
//     );
