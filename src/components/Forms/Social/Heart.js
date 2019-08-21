import React, { useState } from "react";
import { toggleLike } from "../../../services/endpoints-service";

const Heart = ({ liked, item }) => {
  const [status, setStatus] = useState("inactive");

  const updateLike = async () => {
    console.log("like", item);
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      console.log(sentLike);
      setStatus("active");
      //   if (sentLike) {

      //   } else {

      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="heart" onClick={updateLike}>
      {/* use css empty selector to style */}
      {liked || status === "active" ? "like" : null}
    </button>
  );
};

export default Heart;
