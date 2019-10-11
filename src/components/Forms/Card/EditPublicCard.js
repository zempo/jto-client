import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { GalleryContext } from "../../../contexts/GalleryContext";
import {
  validateFrontMessage,
  validateTheme,
  validateInsideMessage
} from "../../../services/validation/card-validation";
import { useForm } from "../../../hooks/get-files";
import { listCards, updateCard, newImages } from "../../../services/endpoints-service";
import { JtoNotification, Loader, EditThemesList } from "../../Utils/Utils";
import "../css/Forms.css";

const EditPublicCard = ({ item, cancel }) => {
  const [card, setCard] = useState({});
  const [showing, setShowing] = useState(false);
  // eslint-disable-next-line
  const [cardTheme, setCardTheme] = useState("");
  const { values, files, errors, handleChange, reset } = useForm(
    { frontMessage: "", insideMessage: "", theme: "" },
    { 1: [], 3: [], 5: [] },
    { frontImage: "", insideImage: "" },
    { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
  );
  const {
    value: { editPublicCard, cards, searchCards }
  } = useContext(GalleryContext);
  const [validReq, setValidReq] = useState(false);
  const [loading, setLoading] = useState(false);
  const unmounted = useRef(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  useLayoutEffect(() => {
    return () => {
      setResStatus(0);
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (item) {
      const cardFound = async () => {
        // setLoading(true);
        try {
          const cardResult = await listCards.get(`/${item}`);
          setCard(cardResult.data);
          setCardTheme(cardResult.data.theme);
        } catch (err) {
          setError(true);
          setResStatus(err.response.status);
          setResMsg(Object.values(err.response.data.error));
        }
      };

      cardFound();
    }
    return () => {
      setResStatus(0);
    };
  }, [item]);

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

      const { theme, insideMessage, frontMessage } = values;
      let fullData = { theme };
      if (sendImageData.data[0] && files.frontImage !== "") {
        fullData.front_image = sendImageData.data[0];
      }
      if (sendImageData.data[1] && files.insideImage !== "") {
        fullData.inside_image = sendImageData.data[1];
      }
      if (frontMessage !== "") {
        fullData.front_message = frontMessage;
      }
      if (insideMessage !== "") {
        fullData.inside_message = insideMessage;
      }
      if (theme === "") {
        fullData.theme = card.theme;
      }

      let sendFullData = await updateCard.patch(`/${item}`, fullData);
      let cardToUpdate = await listCards.get(`/${item}`);
      // eslint-disable-next-line
      let editedCard = await editPublicCard(cards, searchCards, cardToUpdate.data);

      setResMsg("Occasion Updated");
      reset();
      setLoading(false);
      setResStatus(sendFullData.status);
      setTimeout(() => {
        setResStatus(0);
        cancel();
      }, 1000);
    } catch (err) {
      setLoading(false);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
      setTimeout(() => {
        setResStatus(0);
      }, 5000);
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (!showing) {
      setShowing(true);
    } else {
      setShowing(false);
    }
  };

  return (
    <>
      <form className="jto-form edit-card-form" onSubmit={handleSubmit}>
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} done={unmounted.current} />}
        <fieldset className={resStatus === 0 || resStatus === 204 ? null : "shake"}>
          <div className="question-text">
            <label htmlFor="frontMessage">Did Your Occasion Change?</label>
            <ul>
              {errors["1"].map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Happy Occasion Day!"
              id={1}
              name="frontMessage"
              onChange={handleChange}
              defaultValue={card.front_message}
            />
          </div>
          <div className="question-file">
            <label htmlFor="frontImage">New Front Pic?</label>
            <br />
            <input
              type="file"
              placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
              name="frontImage"
              id={2}
              onChange={handleChange}
            />
          </div>
          <div className="question-text">
            <label htmlFor="insideMessage">New Message Inside?</label>
            <ul>
              {errors["3"].map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
            <button id="preview-btn" onClick={handlePreview}>
              {showing ? "▲ Hide" : "▼ Show"} Last Message
            </button>
            <br />
            {showing ? <p className="preview">"{card.inside_message}"</p> : null}
            <textarea
              placeholder="type something to change message..."
              name="insideMessage"
              onChange={handleChange}
              id={3}
              defaultValue={card.inside_message}
            />
          </div>
          <div className="question-file">
            <i className="fas fa-cloud-upload-alt fa-2x"></i>
            <br />
            <label htmlFor="frontImage">New Inside Pic?</label>
            <br />
            <input type="file" placeholder="choose file" name="insideImage" id={4} onChange={handleChange} />
          </div>
          <br />
          <div className="question-select">
            <label htmlFor="themes">New Font?</label>
            <br />
            <select
              className="themes"
              defaultValue={card.theme}
              defaultChecked={card.theme}
              name="theme"
              id={5}
              onChange={handleChange}
            >
              <EditThemesList current={card.theme} />
            </select>
          </div>
        </fieldset>
        {loading ? <Loader loading={loading} status={resStatus} /> : null}
        <button
          id="edit-card-btn"
          className="action"
          disabled={!validReq || errors["1"].length > 0 || errors["3"].length > 0 || errors["5"].length > 0}
          type="submit"
        >
          Edit Occasion
        </button>
      </form>
      {/* <button onClick={cancel}>cancel</button> */}
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </>
  );
};

export default EditPublicCard;
