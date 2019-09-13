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
      const deleted = await deleteUserCard.delete(`/${item}`);

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
    <>
      <h2>Are you sure you want to delete your occasion?</h2>
      <p>Once you delete an Occasion, this action cannot be undone.</p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button onClick={handleDelete}>Delete</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
      <button onClick={cancel}>Cancel</button>
    </>
  );
};

export default DeleteUserCard;
