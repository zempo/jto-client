import React, { useState } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { makePrivate } from "../../../services/endpoints-service";

const MakePrivate = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handlePrivacy = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      const deleted = await makePrivate.patch(`/${item}`);

      setResStatus(deleted.status);
      setResMsg("Occasion Unpublished");
      window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className="jto-privacy">
      <h1>Are you sure you want to make your Occasion Private?</h1>
      <p>
        Other users won't be able to view your occasion. <br />
        However, you can bring your occasion back to the Gallery anytime!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button onClick={handlePrivacy}>Make Occasion Private</button>
      <button onClick={cancel}>Cancel</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default MakePrivate;
