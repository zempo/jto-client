import React, { useState } from "react";
import { JtoNotification } from "../Utils/Utils";
import { deleteCard } from "../../services/endpoints-service";

const DeleteCard = ({ item, cancel }) => {
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
    <>
      <h2>Are you sure you want to delete this person's occasion?</h2>
      <p>Once you delete their Occasion, they won't be happy with you.</p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={cancel}>Cancel</button>
    </>
  );
};

export default DeleteCard;
