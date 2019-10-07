import React, { useState } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { deleteUserCard } from "../../../services/endpoints-service";

const DeleteUserCard = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleDelete = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      // const close = setTimeout(() => {
      //   console.log('closed')
      //   setResStatus(0);
      //   cancel();
      //   unmounted.current = true;
      // }, 1000);
      let deleted = await deleteUserCard.delete(`/${item}`);

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
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <h2>Are you sure you want to delete your occasion?</h2>
      <p>Once you delete an Occasion, this action cannot be undone.</p>
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

export default DeleteUserCard;
