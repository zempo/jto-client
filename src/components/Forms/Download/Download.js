import React from "react";
import { Link } from "react-router-dom";

const Download = ({ item, payload, cancel }) => {
  return (
    <div>
      Item can be passed down, Use item to link to download page or email page (might be labeled as "coming soon" if too
      challenging to create)
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
      <h2>Email Card</h2>
      <div>'display email form'</div>
      <button onClick={cancel}>Cancel</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default Download;
