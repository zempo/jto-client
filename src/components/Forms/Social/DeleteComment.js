import React, { useState, useContext } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { deleteComment, readComment, listCardComments } from "../../../services/endpoints-service";
import { PublicCardContext as CardContext } from "../../../contexts/PublicCardContext";

const DeleteComment = ({ item, cancel }) => {
  const {
    value: { cardComments, deleteCardComment }
  } = useContext(CardContext);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleDelete = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      let commentToDelete = await readComment.get(`/${item}`);
      let deleted = await deleteComment.delete(`/${item}`);
      let commentsResult = await listCardComments.get(`/${commentToDelete.data.card_id}`);
      let deletedComments = await deleteCardComment(commentsResult.data);

      setResStatus(deleted.status);
      setResMsg("Comment Deleted");
      cancel();
      // window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className={resStatus === 0 || resStatus === 204 ? "comment-delete" : "comment-delete shake"}>
      <h2>Are you sure?</h2>
      {resStatus === 0 || resStatus === 204 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action" onClick={handleDelete}>
        Delete
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default DeleteComment;
