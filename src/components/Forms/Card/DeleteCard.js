import React, { useState } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { deleteCard } from "../../../services/endpoints-service";
import "../css/Forms.css";

const DeleteCard = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleDelete = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      const deleted = await deleteCard.delete(`/${item}`);

      setResStatus(deleted.status);
      setResMsg("Occasion Deleted");
      window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className={resStatus === 0 || resStatus === 204 ? null : "shake"}>
      <h2>Are you sure you want to delete this person's occasion?</h2>
      <p>Once you delete their Occasion, they won't be happy with you.</p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <div className="modal-controls">
        <button className="modal-btn" onClick={cancel}>
          Cancel
        </button>
        <button className="modal-btn action" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default DeleteCard;
