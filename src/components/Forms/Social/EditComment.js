import React, { useState, useEffect, useRef, useContext } from "react";
import { validateBody } from "../../../services/validation/comment-validation";
import { useForm } from "../../../hooks/get-files";
import {
  updateComment,
  readComment,
} from "../../../services/endpoints-service";
import { PublicCardContext as CardContext } from "../../../contexts/PublicCardContext";

const EditComment = ({ item, payload, cancel }) => {
  const {
    value: { cardComments, editComment },
  } = useContext(CardContext);
  // eslint-disable-next-line
  const { values, files, errors, handleChange, reset } = useForm(
    { body: payload },
    { 1: [] },
    {},
    { 1: validateBody }
  );
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
      let fullData = { body };
      if (body !== "") {
        fullData.body = body;
      }

      let sendFullData = await updateComment.patch(`/${item}`, fullData);
      let commentToUpdate = await readComment.get(`/${item}`);
      // eslint-disable-next-line
      let updatedComments = await editComment(
        cardComments,
        commentToUpdate.data.payload
      );

      setResStatus(sendFullData.status);
      setResMsg("Updated Comment");
      cancel();
    } catch (error) {
      setLoading(false);
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.message));
    }
  };

  return (
    <>
      <form
        className='jto-comment-form add-comment-form'
        onSubmit={handleSubmit}
      >
        <fieldset>
          <ul>
            {errors["1"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <textarea
            ref={bodyRef}
            type='text'
            placeholder={payload}
            id={1}
            name='body'
            onChange={handleChange}
            value={values.body}
          />
        </fieldset>
        <button className='modal-btn' onClick={cancel}>
          Cancel
        </button>
        <button
          className='modal-btn action'
          disabled={!validReq || bodyRef.current.value.length === 0}
          type='submit'
        >
          Edit
        </button>
      </form>
      <button className='close-modal' onClick={cancel}>
        X
      </button>
    </>
  );
};

export default EditComment;
