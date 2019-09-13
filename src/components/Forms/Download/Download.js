import React from "react";

const Download = ({ item, cancel }) => {
  return (
    <div>
      Item can be passed down, Use item to link to download page or email page (might be labeled as "coming soon" if too
      challenging to create)
      <h2>Download Card</h2>
      <h2>Email Card</h2>
      <h2>Share Link</h2>
      <button onClick={cancel}>Cancel</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default Download;
