import React, { useState } from "react";
import { JtoNotification } from "../Utils/Utils";
import { makePublic } from "../../services/endpoints-service";

const MakePublic = ({ item, cancel }) => {
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
      <h1>Are you ready to Publish your Occasion?</h1>
      <p>
        Once your publish your occasion, you'll have to. <br />
        However, you can bring your occasion back to the Gallery anytime!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button onClick={handlePrivacy}>Make Occasion Private</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

export default MakePublic;
