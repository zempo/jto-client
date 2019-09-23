import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const DownloadPage = (props) => {
  console.log(props.location.state.payload);
  const { theme, front_message, front_image, inside_message, inside_image, user } = props.location.state.payload;
  const {
    value: { user: card_user }
  } = useContext(UserContext);
  return (
    <div>
      <h1 className="animated-h1">Download an Occasion</h1>
      <h2 className="animated-h2">From {card_user.user_name === user.user_name ? "You" : user.user_name}</h2>
    </div>
  );
};

export default DownloadPage;
