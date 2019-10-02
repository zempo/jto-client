import React from "react";
import { Link } from "react-router-dom";

const Download = ({ item, payload, cancel }) => {
  return (
    <div className="download-menu">
      <h2>
        <Link
          to={{
            pathname: "/download-card",
            state: {
              item,
              payload
            }
          }}
        >
          Download
        </Link>
      </h2>
      <h2>Email Card (Coming Soon!)</h2>
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default Download;
