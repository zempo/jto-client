import React from "react";
import {} from "../../../services/endpoints-service";

const Heart = ({ liked, item }) => {
  // const [] = useState(liked)

  const sendLike = () => {
    console.log("like", item);
  };

  const unlike = () => {
    console.log("unlike", item);
  };
  if (!liked) {
    return (
      <button className="heart" onClick={sendLike}>
        {/* use css empty selector to style */}
      </button>
    );
  } else {
    return (
      <button className="heart" onClick={unlike}>
        {/* use css empty selector to style */}
        <p>Already Liked</p>
      </button>
    );
  }
};

export default Heart;
