import React, { useState } from "react";
import { toggleLike, toggleShare } from "../../../services/endpoints-service";

export const PostReaction = ({ item }) => {
  const [status, setStatus] = useState("inactive");

  const createAndSendHeart = async () => {
    try {
      const createReact = await toggleLike.post(`/${item}`);
      console.log(createReact);
      setStatus("active");
    } catch (error) {
      console.log(error);
    }
  };

  const createAndSendShare = async () => {
    try {
      const createReact = await toggleShare.post(`/${item}`);
      console.log(createReact);
      setStatus("active");
    } catch (error) {
      console.log(error);
    }
  };

  const updateHeart = async () => {
    console.log("like", item);
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      console.log(sentLike);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    console.log("like", item);
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      console.log(sentShare);
    } catch (error) {
      console.log(error);
    }
  };

  return status === "inactive" ? (
    <>
      <button className="heart" onClick={createAndSendHeart}>
        {/* use css empty selector to style */}
        create and send
      </button>
      <button className="share" onClick={createAndSendShare}>
        {/* use css empty selector to style */}
        create and send
      </button>
    </>
  ) : (
    <>
      <button className="heart" onClick={updateHeart}>
        {/* use css empty selector to style */}
        toggle
      </button>
      <button className="share" onClick={updateShare}>
        {/* use css empty selector to style */}
        toggle
      </button>
    </>
  );
};

export const ToggleReaction = ({ liked, shared, item }) => {
  const updateHeart = async () => {
    console.log("like", item);
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      console.log(sentLike);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    console.log("like", item);
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      console.log(sentShare);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="heart" onClick={updateHeart}>
        {/* use css empty selector to style */}
        toggle
      </button>
      <button className="share" onClick={updateShare}>
        {/* use css empty selector to style */}
        toggle
      </button>
    </>
  );
};
