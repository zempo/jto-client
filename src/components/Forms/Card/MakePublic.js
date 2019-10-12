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
      <h2>Publish Your Occasion?</h2>
      <p>
        Click the button to share your occasion
        <br />
        You can toggle your occasion's privacy anytime!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <div className="modal-controls">
        <button className="modal-btn" onClick={cancel}>
          Cancel
        </button>
        <button className="modal-btn action" onClick={handlePrivacy}>
          Publish Occasion
        </button>
      </div>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default MakePublic;
