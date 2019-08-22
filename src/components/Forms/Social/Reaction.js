import React, { useState } from "react";
import { toggleLike, toggleShare, listCardReacts } from "../../../services/endpoints-service";

export const PostReaction = ({ item }) => {
  const [status, setStatus] = useState("inactive");
  const [heart, setHeart] = useState(false)
  const [share, setShare] = useState(false)

  const createAndSendHeart = async () => {
    try {
      const createReact = await toggleLike.post(`/${item}`);
      console.log(createReact);
      setStatus("active");
      setHeart(true)
    } catch (error) {
      console.log(error);
    }
  };

  const createAndSendShare = async () => {
    try {
      const createReact = await toggleShare.post(`/${item}`);
      console.log(createReact);
      setStatus("active");
      setShare(true)
    } catch (error) {
      console.log(error);
    }
  };

  const updateHeart = async () => {
    console.log("like", item);
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`)
      console.log(sentLike);
      console.log(readLike);
      setHeart(readLike.data[0].react_heart)
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    console.log("like", item);
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      const readShare = await listCardReacts.get(`/${item}`)
      console.log(sentShare);
      console.log(readShare);
      setShare(readShare.data[0].react_share)
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
          {heart ? 'on' : 'off'}
          toggle
      </button>
        <button className="share" onClick={updateShare}>
          {/* use css empty selector to style */}
          toggle
        {share ? 'on' : 'off'}
        </button>
      </>
    );
};

export const ToggleReaction = ({ item, liked, shared }) => {
  const [heart, setHeart] = useState(liked)
  const [share, setShare] = useState(shared)

  const updateHeart = async () => {
    console.log("like", item);
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`)
      console.log(sentLike);
      console.log(readLike);
      setHeart(readLike.data[0].react_heart)
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    console.log("like", item);
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      const readShare = await listCardReacts.get(`/${item}`)
      console.log(sentShare);
      console.log(readShare);
      setShare(readShare.data[0].react_share)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="heart" onClick={updateHeart}>
        {/* use css empty selector to style */}
        toggle
        {heart ? 'on' : 'off'}
      </button>
      <button className="share" onClick={updateShare}>
        {/* use css empty selector to style */}
        toggle
        {share ? 'on' : 'off'}
      </button>
    </>
  );
};
