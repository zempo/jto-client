import React from "react";

const DownloadPage = (props) => {
  const { theme, front_message, front_image, inside_message, inside_image } = props.location.state.payload;
  return (
    <div>
      <h1>{front_message}</h1>
    </div>
  );
};

export default DownloadPage;
