// import React, { useEffect, useState, useContext } from "react";
// // import { CardContext, CardContextProvider } from "../../contexts/CardContext";
// import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
// // create back-button
// import { JtoSection, Loader, DotMenuOption, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
// import "./css/Card.css";
import React, { useState, useEffect } from "react";
import { validateFrontMessage, validateTheme, validateInsideMessage } from "../../services/validation/card-validation";
import { useForm } from "../../hooks/get-files";
import { listCards, updateCard, newImages } from "../../services/endpoints-service";
import { JtoNotification, Loader, EditThemesList } from "../Utils/Utils";
import "./css/Forms.css";

const EditPublicCard = ({ item, cancel }) => {
  const [card, setCard] = useState({});
  const [cardTheme, setCardTheme] = useState("");
  const { values, files, errors, handleChange, reset } = useForm(
    { frontMessage: "", insideMessage: "", theme: "" },
    { 1: [], 3: [], 5: [] },
    { frontImage: "", insideImage: "" },
    { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
  );
  const [validReq, setValidReq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  useEffect(() => {
    if (item) {
      const cardFound = async () => {
        // setLoading(true);
        try {
          const cardResult = await listCards.get(`/${item}`);
          console.log(cardResult.data);
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
    // eslint-disable-next-line
  }, []);

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
      let sendFullData = await updateCard.patch(`/${item}`, fullData);
      setResStatus(sendFullData.status);
      setResMsg("Occasion Updated");
      reset();
      window.location.reload();
    } catch (err) {
      setLoading(false);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <>
      <h2>Edit Your Occasion</h2>
      <form className="jto-form add-card-form" onSubmit={handleSubmit}>
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
        <fieldset>
          <label htmlFor="frontMessage">Want to Change the Occasion?</label>
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
          <label htmlFor="frontImage">Want a new Cover?</label>
          <br />
          <input
            type="file"
            placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
            name="frontImage"
            id={2}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="insideMessage">Want to change the Inside?</label>
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
          <label htmlFor="frontImage">Want a new inside picture?</label>
          <br />
          <input type="file" placeholder="choose file" name="insideImage" id={4} onChange={handleChange} />
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
              Want a new font?
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
      <button onClick={cancel}>cancel</button>
      {loading ? <Loader loading={true} /> : <Loader loading={false} />}
    </>
  );
};

export default EditPublicCard;