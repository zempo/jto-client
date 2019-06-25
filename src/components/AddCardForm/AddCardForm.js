import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function AddCard(props) {
  const [frontMessage, setFrontMessage] = useState(0);
  const [frontImage, setFrontImage] = useState(0);
  return (
    <form className="Addcard">
      <fieldset>
        <input
          type="text"
          placeholder="A Celebration of Recent Events..."
          name="frontMessage"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="https://www.your-image.com/images/1"
          name="frontImage"
          onChange={this.handleChange}
        />
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
