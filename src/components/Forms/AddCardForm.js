import React, { useState } from "react";
import { useInput } from "../../hooks/input-hook";
import { validateFrontMessage, validateTheme, validateInsideMessage } from "../../services/validation/card-validation";
import { newImages } from "../../services/endpoints-service";
import { JtoNotification, Required } from "../Utils/Utils";
import "./css/Forms.css";
// import { saveAs } from "file-saver";
// import PropTypes from "prop-types";

function AddCard(props) {
  const { value: theme, error: themeError, bind: bindTheme, reset: resetTheme } = useInput("", validateTheme);
  const { value: frontMessage, error: frontMsgError, bind: bindFrontMessage, reset: resetFrontMessage } = useInput(
    "",
    validateFrontMessage
  );
  const { value: insideMessage, error: inMsgError, bind: bindInsideMessage, reset: resetInsideMessage } = useInput(
    "",
    validateInsideMessage
  );
  const { files: frontImage, fileBind: bindFrontImage, fileReset: resetFrontImage } = useInput(null);
  const { files: insideImage, fileBind: bindInsideImage, fileReset: resetInsideImage } = useInput(null);
  const [frontUrl, setFrontUrl] = useState("");
  const [insideUrl, setInsideUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorStatus, setErrorStatus] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData();
    try {
      formData.append("front", frontImage);
      formData.append("inside", insideImage);

      let sendImageData = await newImages.post("/", formData);
      // sendImageData returns an array of the urls. conditionally add them to the img data
      if (!sendImageData) return "Sorry, no dice :/";
      console.log(sendImageData);
      setLoading(false);
      setFrontUrl(sendImageData.data[0]);
      setInsideUrl(sendImageData.data[1]);

      let fullData = { theme };
      if (sendImageData.data[0]) {
        fullData.front_image = sendImageData.data[0];
      }
      if (sendImageData.data[1]) {
        fullData.inside_image = sendImageData.data[1];
      }
      fullData.front_message = frontMessage;
      fullData.inside_message = insideMessage;
      console.log("post to db", fullData);
      // let sendImageData2 = await axios.post(`${Config.API_ENDPOINT}/api/private/cards/1`, fullData);

      setErrorStatus(0);
      setErrorMsg("");
      resetFrontMessage();
      resetFrontImage();
      resetInsideMessage();
      resetInsideImage();
      resetTheme();
    } catch (error) {
      // console.log(error.response);
      // console.log(error.response.data.error);
      // console.log(error.response.status);
      setLoading(false);
      setErrorStatus(error.response.status);
      setErrorMsg(Object.values(error.response.data.error));
    }
  };

  return (
    <form className="jto-form add-card-form" onSubmit={handleSubmit}>
      {errorStatus === 0 ? null : <JtoNotification type={errorStatus} msg={errorMsg} />}
      <fieldset>
        <label htmlFor="frontMessage">
          <Required met={frontMessage.length === 0 ? false : true} />
          What's the Occassion?
        </label>
        <input type="text" placeholder="Happy Occasion Day!" name="frontMessage" {...bindFrontMessage} />
        <br />
        <label htmlFor="frontImage">Does your Occasion need a Cover Image?</label>
        <input
          type="file"
          placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
          name="frontImage"
          {...bindFrontImage}
        />
        <br />
        <label htmlFor="insideMessage">
          <Required met={insideMessage.length === 0 ? false : true} />
          What do you want to say inside the card?
        </label>
        <textarea placeholder="From yours, truly!" name="insideMessage" {...bindInsideMessage} />
        <br />
        <label htmlFor="frontImage">Do you want a picture inside the card?</label>
        <input type="file" placeholder="choose file" name="insideImage" {...bindInsideImage} />
        <br />
        <Required met={theme.length === 0 ? false : true} />
        <select className="themes" name="theme" id="theme" {...bindTheme} required>
          <option value="" disabled selected>
            Please Choose Theme...
          </option>
          <option value="cursive">Cursive</option>
          <option value="cursive-plus">Cursive+</option>
          <option value="handwritten">Handwritten</option>
          <option value="handwritten-bold">Handwritten Bold</option>
          <option value="indie">Indie</option>
          <option value="kiddo">Kiddo</option>
          <option value="pen">Pen</option>
          <option value="sharpie">Sharpie</option>
          <option value="roboto">Roboto</option>
          <option value="typed">Typed</option>
          <option value="quill">Quill</option>
        </select>
      </fieldset>
      <button type="submit">Create Occasion</button>
      <br />
      <img className="front" src={frontUrl} alt="cloudinary output front" />
      <br />
      <img className="inside" src={insideUrl} alt="cloudinary output inside" />
    </form>
  );
}

export default AddCard;
