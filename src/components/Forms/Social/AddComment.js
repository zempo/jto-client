import React, { useState, useEffect, useRef, useContext } from "react";
import { validateBody } from "../../../services/validation/comment-validation";
import { Required } from "../../Utils/Utils";
import { useForm } from "../../../hooks/get-files";
import { newComment } from "../../../services/endpoints-service";
import { PublicCardContext as CardContext } from "../../../contexts/PublicCardContext";

const AddComment = ({ item, cancel }) => {
  const {
    value: { cardComments, addToComments }
  } = useContext(CardContext);
  // eslint-disable-next-line
  const { values, files, errors, handleChange, reset } = useForm({ body: "" }, { 1: [] }, {}, { 1: validateBody });
  const [validReq, setValidReq] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const [resMsg, setResMsg] = useState("");
  // eslint-disable-next-line
  const [resStatus, setResStatus] = useState(0);
  const bodyRef = useRef();

  useEffect(() => {
    if (errors["1"].length > 0) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResStatus(0);
    setResMsg("");
    try {
      setLoading(false);

      const { body } = values;
      let fullData = { card_id: item, body };
      let sendFullData = await newComment.post("/", fullData);
      // eslint-disable-next-line
      let updatedComments = await addToComments(cardComments, sendFullData.data);

      setResStatus(sendFullData.status);
      setResMsg("Added Comment");
      reset();
      cancel();
      // window.location.reload();
    } catch (error) {
      setLoading(false);
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
    }
  };

  return (
    <>
      <form className="jto-comment-form add-comment-form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="body">
            <Required met={values.body.length === 0 ? false : true} />
          </label>
          <textarea
            ref={bodyRef}
            type="text"
            placeholder="Write a comment..."
            id={1}
            name="body"
            onChange={handleChange}
            value={values.body}
          />
          <ul>
            {errors["1"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </fieldset>
        <button className="action" disabled={!validReq || bodyRef.current.value.length === 0} type="submit">
          Comment
        </button>
      </form>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </>
  );
};

export default AddComment;
