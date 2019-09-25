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
    <div className={resStatus === 0 || resStatus === 204 ? "jto-privacy" : "jto-privacy shake"}>
      <h2>Make Occasion Private?</h2>
      <p>
        Click the button to hide your occasion
        <br />
        You can bring your occasion back here, anytime!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn" onClick={handlePrivacy}>
        Hide Occasion
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default MakePrivate;
