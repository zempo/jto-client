import React, { useState } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { makePublic } from "../../../services/endpoints-service";

const MakePublic = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handlePrivacy = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      const deleted = await makePublic.patch(`/${item}`);

      setResStatus(deleted.status);
      setResMsg("Occasion Sent to Gallery");
      window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className="jto-privacy">
      <h2>Are you ready to Publish your Occasion?</h2>
      <p>
        Once your publish your occasion, other users will be able see it. <br />
        However, you can remove your occasion from the gallery anytime you wish!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button className="modal-btn" onClick={handlePrivacy}>
        Make Occasion Public
      </button>
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default MakePublic;
