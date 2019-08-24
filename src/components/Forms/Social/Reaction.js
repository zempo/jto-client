import React, { useState } from "react";
import { toggleLike, toggleShare, listCardReacts } from "../../../services/endpoints-service";
import { useModal } from "../../../hooks/use-modal";
import Modal from "../../../modals/Modal";
import "./css/Social.css";

export const PostReaction = ({ item }) => {
  const [status, setStatus] = useState("inactive");
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();

  const createAndSendHeart = async () => {
    try {
      const createReact = await toggleLike.post(`/${item}`);
      setStatus("active");
      setHeart(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createAndSendShare = async () => {
    try {
      const createReact = await toggleShare.post(`/${item}`);
      setStatus("active");
      setShare(true);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateHeart = async () => {
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`);
      setHeart(readLike.data[0].react_heart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      const readShare = await listCardReacts.get(`/${item}`);

      setShare(readShare.data[0].react_share);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  return status === "inactive" ? (
    <>
      <button className="heart" onClick={createAndSendHeart} />
      <button className="share" onClick={createAndSendShare} />
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  ) : (
    <>
      <button className="heart" onClick={updateHeart}>
        {heart ? "liked" : null}
      </button>
      <button className="share" onClick={updateShare}>
        {share ? "bookmarked" : null}
      </button>
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  );
};

export const ToggleReaction = ({ item, liked, shared }) => {
  const [heart, setHeart] = useState(liked);
  const [share, setShare] = useState(shared);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();

  const updateHeart = async () => {
    try {
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`);
      setHeart(readLike.data[0].react_heart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    try {
      const sentShare = await toggleShare.patch(`/${item}`);
      const readShare = await listCardReacts.get(`/${item}`);

      setShare(readShare.data[0].react_share);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="heart" onClick={updateHeart}>
        {heart ? "liked" : null}
      </button>
      <button className="share" onClick={updateShare}>
        {share ? "bookmarked" : null}
      </button>
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  );
};
