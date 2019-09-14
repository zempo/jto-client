import React, { useState } from "react";
import { toggleLike, toggleShare, listCardReacts } from "../../../services/endpoints-service";
import { useModal } from "../../../hooks/use-modal";
import Modal from "../../../modals/Modal";
import "./css/Social.css";

export const PostReaction = ({ item }) => {
  const [pulse, setPulse] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();

  const createAndSendHeart = async (e) => {
    setPulse(false);
    try {
      // eslint-disable-next-line
      const createReact = await toggleLike.post(`/${item}`);
      setPulse(true);
      setStatus("active");
      setHeart(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createAndSendShare = async () => {
    try {
      // eslint-disable-next-line
      const createReact = await toggleShare.post(`/${item}`);
      setStatus("active");
      setShare(true);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateHeart = async (e) => {
    setPulse(false);
    try {
      // eslint-disable-next-line
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`);

      setPulse(true);
      setHeart(readLike.data[0].react_heart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    try {
      // eslint-disable-next-line
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
      <span className="heart-button">
        <i id="border" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={createAndSendHeart}>
          {heart ? <span>liked</span> : null}
        </i>
        <i id="body" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={createAndSendHeart}>
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i className="far fa-comment-alt" title="comment"></i>
      <i className="fas fa-file-download" title="download" onClick={createAndSendShare}>
        {share ? "bookmarked" : null}
      </i>
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  ) : (
    <>
      <span className="heart-button">
        <i id="border" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={updateHeart}>
          {heart ? <span>liked</span> : null}
        </i>
        <i id="body" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={updateHeart}>
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i className="far fa-comment-alt" title="comment"></i>
      <i className="fas fa-file-download" title="download" onClick={updateShare}>
        {share ? <span></span> : null}
      </i>
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  );
};

export const ToggleReaction = ({ item, liked, shared }) => {
  const [pulse, setPulse] = useState(false);
  const [heart, setHeart] = useState(liked);
  const [share, setShare] = useState(shared);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();

  const updateHeart = async (e) => {
    setPulse(false);
    try {
      // eslint-disable-next-line
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardReacts.get(`/${item}`);
      setPulse(true);
      setHeart(readLike.data[0].react_heart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShare = async () => {
    try {
      // eslint-disable-next-line
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
      <span className="heart-button">
        <i id="border" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={updateHeart}>
          {heart ? <span>liked</span> : null}
        </i>
        <i id="body" className={`fas fa-heart ${pulse ? "beat" : null}`} title="heart" onClick={updateHeart}>
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i className="far fa-comment-alt" title="comment"></i>
      <i className="fas fa-file-download" title="download" onClick={updateShare}>
        <span>{share ? "bookmarked" : null}</span>
      </i>
      <Modal item={item} action="download-card" isShowing={isShowingDownload} hide={toggleDownload} />
    </>
  );
};
