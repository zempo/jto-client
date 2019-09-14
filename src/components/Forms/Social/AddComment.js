import React, { useState, useEffect, useRef } from "react";
import { validateBody } from "../../../services/validation/comment-validation";
import { useForm } from "../../../hooks/get-files";
import { newComment, updateComment, deleteComment } from "../../../services/endpoints-service";
import { Required } from "../../Utils/Utils";

const AddComment = ({ comment }) => {
  const { values, files, errors, handleChange, reset } = useForm({ body: "" }, { 1: [] }, {}, { 1: validateBody });
  const [validReq, setValidReq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");
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
    <>
      <form className="jto-comment-form add-comment-form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="body">
            <Required met={values.frontMessage.length === 0 ? false : true} />
            What's the Occassion?
          </label>
          <input
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
