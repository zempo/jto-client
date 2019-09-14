import React, { useState, useEffect, useRef } from "react";
import { validateBody } from "../../../services/validation/comment-validation";
import { useForm } from "../../../hooks/get-files";
import { newComment } from "../../../services/endpoints-service";
// import { Required } from "../../Utils/Utils";

const AddComment = ({ comment }) => {
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
      let fullData = { card_id: comment, body };
      let sendFullData = await newComment.post("/", fullData);

      setResStatus(sendFullData.status);
      setResMsg("Added Comment");
      reset();
      window.location.reload();
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
        <button disabled={!validReq || bodyRef.current.value.length === 0} type="submit">
          Comment
        </button>
      </form>
    </>
  );
};

export default AddComment;
