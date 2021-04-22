import React, { useState, useContext } from "react";
import {
  toggleLike,
  listCardActions,
  toggleSave,
} from "../../../services/endpoints-service";
import { useModal } from "../../../hooks/use-modal";
import Modal from "../../../modals/Modal";
import "./css/Social.css";
import { PublicCardContext as CardContext } from "../../../contexts/PublicCardContext";

export const PostReaction = ({ item, payload, toggleCommentAdd }) => {
  const [pulse, setPulse] = useState(false);
  const [status, setStatus] = useState("inactive");
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();
  const {
    value: { card },
  } = useContext(CardContext);

  const createAndSendLike = async (e) => {
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

  const createAndSendSave = async () => {
    try {
      // eslint-disable-next-line
      const createReact = await toggleSave.post(`/${item}`);
      setStatus("active");
      setShare(true);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLike = async (e) => {
    setPulse(false);
    try {
      // eslint-disable-next-line
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardActions.get(`/${item}`);

      setPulse(true);
      setHeart(readLike.data[0].payload.action_liked);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSave = async () => {
    try {
      // eslint-disable-next-line
      const sentSave = await toggleSave.patch(`/${item}`);
      const readSave = await listCardActions.get(`/${item}`);

      setShare(readSave.data[0].payload.action_saved);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  return status === "inactive" ? (
    <>
      <span className='heart-button'>
        <i
          id='border'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={createAndSendLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
        <i
          id='body'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={createAndSendLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i
        className='far fa-comment-alt'
        title='comment'
        onClick={toggleCommentAdd}
      ></i>
      <i
        className='fas fa-file-download'
        title='download'
        onClick={createAndSendSave}
      >
        {share ? "bookmarked" : null}
      </i>
      <Modal
        item={item}
        action='download-card'
        isShowing={isShowingDownload}
        hide={toggleDownload}
        payload={card}
      />
    </>
  ) : (
    <>
      <span className='heart-button'>
        <i
          id='border'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={updateLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
        <i
          id='body'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={updateLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i
        className='far fa-comment-alt'
        title='comment'
        onClick={toggleCommentAdd}
      ></i>
      <i className='fas fa-file-download' title='download' onClick={updateSave}>
        {share ? <span></span> : null}
      </i>
      <Modal
        item={item}
        action='download-card'
        isShowing={isShowingDownload}
        hide={toggleDownload}
        payload={card}
      />
    </>
  );
};

export const ToggleReaction = ({ item, liked, shared, toggleCommentAdd }) => {
  const [pulse, setPulse] = useState(false);
  const [heart, setHeart] = useState(liked);
  const [share, setShare] = useState(shared);
  const { isShowing: isShowingDownload, toggle: toggleDownload } = useModal();
  const {
    value: { card },
  } = useContext(CardContext);

  const updateLike = async (e) => {
    setPulse(false);
    try {
      // eslint-disable-next-line
      const sentLike = await toggleLike.patch(`/${item}`);
      const readLike = await listCardActions.get(`/${item}`);
      setPulse(true);
      setHeart(readLike.data[0].action_liked);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSave = async () => {
    try {
      // eslint-disable-next-line
      const sentSave = await toggleSave.patch(`/${item}`);
      const readSave = await listCardActions.get(`/${item}`);

      setShare(readSave.data[0].action_saved);
      toggleDownload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className='heart-button'>
        <i
          id='border'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={updateLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
        <i
          id='body'
          className={`fas fa-heart ${pulse ? "beat" : null}`}
          title='like'
          onClick={updateLike}
        >
          {heart ? <span>liked</span> : null}
        </i>
      </span>
      <i
        className='far fa-comment-alt'
        title='comment'
        onClick={toggleCommentAdd}
      ></i>
      <i className='fas fa-file-download' title='download' onClick={updateSave}>
        <span>{share ? "bookmarked" : null}</span>
      </i>
      <Modal
        item={item}
        action='download-card'
        isShowing={isShowingDownload}
        hide={toggleDownload}
        payload={card}
      />
    </>
  );
};
