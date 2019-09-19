import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from "react";
import {
  validateFrontMessage,
  validateTheme,
  validateInsideMessage
} from "../../../services/validation/card-validation";
import { CardsContext } from "../../../contexts/CardsContext";
import { useForm } from "../../../hooks/get-files";
import { listUserCards, updateUserCard, newImages } from "../../../services/endpoints-service";
import { JtoNotification, Loader, EditThemesList } from "../../Utils/Utils";
import "../css/Forms.css";

const EditCard = ({ item, cancel }) => {
  const [card, setCard] = useState({});
  // eslint-disable-next-line
  const [cardTheme, setCardTheme] = useState("");
  const { values, files, errors, handleChange, reset } = useForm(
    { frontMessage: "", insideMessage: "", theme: "" },
    { 1: [], 3: [], 5: [] },
    { frontImage: "", insideImage: "" },
    { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
  );
  const {
    value: { editPrivateCards, cards, searchCards }
  } = useContext(CardsContext);
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
          const cardResult = await listUserCards.get(`/${item}`);
          setCard(cardResult.data[0]);
          setCardTheme(cardResult.data[0].theme);
        } catch (err) {
          setError(true);
          setResStatus(err.response.status);
          setResMsg(Object.values(err.response.data.error));
        }
      };

      cardFound();
    }
    // eslint-disable-next-line
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
      // console.log(fullData)
      let sendFullData = await updateUserCard.patch(`/${item}`, fullData);
      let cardToUpdate = await listUserCards.get(`/${item}`);
      let editedCard = await editPrivateCards(cards, searchCards, cardToUpdate.data[0]);

      setResMsg("Occasion Updated");
      reset();
      setResStatus(sendFullData.status);
      setTimeout(() => {
        setResStatus(0);
        cancel();
      }, 1000);
      // window.location.reload();
    } catch (err) {
      setLoading(false);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <>
      <h2>Edit Your Occasion</h2>
      <form className="jto-comment-form add-card-form" onSubmit={handleSubmit}>
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} done={unmounted.current} />}
        <fieldset className={resStatus === 0 || resStatus === 204 ? null : "shake"}>
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
          <br />
          <br />
          <label htmlFor="frontImage">New Front Pic?</label>
          <br />
          <input
            type="file"
            placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
            name="frontImage"
            id={2}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="insideMessage">New Message Inside?</label>
          <ul>
            {errors["3"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <textarea
            placeholder={card.inside_message}
            name="insideMessage"
            onChange={handleChange}
            id={3}
            defaultValue={card.inside_message}
          />
          <br />
          <br />
          <label htmlFor="frontImage">New Inside Pic?</label>
          <br />
          <input type="file" placeholder="choose file" name="insideImage" id={4} onChange={handleChange} />
          <br />
          <br />
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
            <option value="" disabled>
              New Font?
            </option>
            <EditThemesList current={card.theme} />
          </select>
        </fieldset>
        <button
          disabled={!validReq || errors["1"].length > 0 || errors["3"].length > 0 || errors["5"].length > 0}
          type="submit"
        >
          Edit Occasion
        </button>
      </form>
      {/* <button onClick={cancel}>Cancel</button> */}
      <button className="close-modal" onClick={cancel}>
        X
      </button>
      {/* {loading ? <Loader loading={true} /> : <Loader loading={false} />} */}
    </>
  );
};

export default EditCard;
