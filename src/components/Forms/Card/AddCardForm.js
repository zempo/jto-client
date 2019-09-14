import React, { useState, useEffect, useRef } from "react";
import {
  validateFrontMessage,
  validateTheme,
  validateInsideMessage
} from "../../../services/validation/card-validation";
import { useForm } from "../../../hooks/get-files";
import { newImages, newCard } from "../../../services/endpoints-service";
import { JtoNotification, Required, Loader, ThemesList } from "../../Utils/Utils";
import "../css/Forms.css";

function AddCard({ item, cancel }) {
  // data binding
  const { values, files, errors, handleChange, reset } = useForm(
    { frontMessage: "", insideMessage: "", theme: "" },
    { 1: [], 3: [], 5: [] },
    { frontImage: "", insideImage: "" },
    { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
  );
  // cloudinary call
  // eslint-disable-next-line
  const [frontUrl, setFrontUrl] = useState("");
  // eslint-disable-next-line
  const [insideUrl, setInsideUrl] = useState("");
  // references
  const [validReq, setValidReq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const frontMsgRef = useRef();
  const insideMsgRef = useRef();
  const themeRef = useRef();

  useEffect(() => {
    if (errors["1"].length > 0 || errors["3"].length > 0) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData();
    setResStatus(0);
    setResMsg("");
    try {
      formData.append("front", files.frontImage);
      formData.append("inside", files.insideImage);

      let sendImageData = await newImages.post("/", formData);
      // sendImageData returns an array of the urls. conditionally add them to the img data
      if (!sendImageData) return "Sorry, no dice :/";
      setLoading(false);
      setFrontUrl(sendImageData.data[0]);
      setInsideUrl(sendImageData.data[1]);

      const { theme, insideMessage, frontMessage } = values;
      let fullData = { theme };
      if (sendImageData.data[0]) {
        fullData.front_image = sendImageData.data[0];
      }
      if (sendImageData.data[1]) {
        fullData.inside_image = sendImageData.data[1];
      }
      fullData.front_message = frontMessage;
      fullData.inside_message = insideMessage;
      let sendFullData = await newCard.post("/", fullData);

      setResStatus(sendFullData.status);
      setResMsg("New Occasion Created");
      reset();
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
    }
  };

  return (
    <div>
      <form className="jto-form add-card-form" onSubmit={handleSubmit}>
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
        <fieldset className={resStatus === 0 || resStatus === 200 ? null : "shake"}>
          <label htmlFor="frontMessage">
            <Required met={values.frontMessage.length === 0 ? false : true} />
            What's the Occassion?
          </label>
          <ul>
            {errors["1"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <input
            ref={frontMsgRef}
            type="text"
            placeholder="Happy Occasion Day!"
            id={1}
            name="frontMessage"
            onChange={handleChange}
            value={values.frontMessage}
          />
          <br />
          <br />
          <label htmlFor="frontImage">
            Pic on the front? <span className="met">Optional</span>
          </label>
          <br />
          <input type="file" placeholder="Pick Img" name="frontImage" id={2} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="insideMessage">
            <Required met={values.insideMessage.length === 0 ? false : true} />A Message Inside?
          </label>
          <ul>
            {errors["3"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <textarea
            ref={insideMsgRef}
            placeholder="From yours, truly!"
            name="insideMessage"
            onChange={handleChange}
            id={3}
            value={values.insideMessage}
          />
          <br />
          <br />
          <label htmlFor="frontImage">
            Pic on the Inside? <span className="met">Optional</span>
          </label>{" "}
          <br />
          <input type="file" placeholder="Pick Img" name="insideImage" id={4} onChange={handleChange} />
          <br />
          <br />
          <Required met={values.theme.length === 0 ? false : true} />
          <select
            ref={themeRef}
            className="themes"
            value={values.theme}
            name="theme"
            id={5}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Font?
            </option>
            <ThemesList />
          </select>
        </fieldset>
        <button
          disabled={
            !validReq ||
            frontMsgRef.current.value.length === 0 ||
            insideMsgRef.current.value.length === 0 ||
            themeRef.current.value.length === 0
          }
          type="submit"
        >
          Create Occasion
        </button>
      </form>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
      {loading ? <Loader loading={true} /> : <Loader loading={false} />}
    </div>
  );
}

export default AddCard;
