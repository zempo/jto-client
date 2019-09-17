import React, { useState } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { deleteComment } from "../../../services/endpoints-service";
import { PublicCardContext as CardContext } from "../../../contexts/PublicCardContext";

const DeleteComment = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleDelete = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      const deleted = await deleteComment.delete(`/${item}`);

      setResStatus(deleted.status);
      setResMsg("Comment Deleted");
      window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className={resStatus === 0 || resStatus === 204 ? null : "shake"}>
      <h2>Are you sure you want to delete your comment?</h2>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button onClick={handleDelete}>Yes</button>
      <button onClick={cancel}>No</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default DeleteComment;
