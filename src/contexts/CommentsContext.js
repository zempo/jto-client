import React, { createContext, useState, useEffect } from "react";
// eslint-disable-next-line
import { listCardComments, updateComment } from "../services/endpoints-service";

export const CommentsContext = createContext();

export const CommentsContextProvider = (props) => {
  // eslint-disable-next-line
  const [cardComments, setCardComments] = useState([]);
  const [cardCommentsId, setCardCommentsId] = useState(0);
  const [error, setError] = useState(false);

  const getId = (cardId) => {
    setCardCommentsId(cardId);
  };

  useEffect(() => {
    const cardFound = async () => {
      try {
        const commentsResult = await listCardComments.get(`/${cardCommentsId}`);
        // console.log("hello");
        setCardComments(commentsResult.data);
        // setCard(result.data);
      } catch (err) {
        if (err.response.status === 401) {
          setError(true);
        }
      }
    };

    cardFound();
    // eslint-disable-next-line
  }, [cardCommentsId > 0]);

  const addToComments = async (currentComments, newComment) => {
    const newComments = currentComments.push(newComment);

    setCardComments(newComments);
  };

  const editComment = (currentComments, updatedComment) => {
    const updatedComments = currentComments.filter((comment) => comment.id !== updateComment.id).push(updateComment);

    setCardComments(updatedComments);
  };

  const deleteComment = (currentComments, commentToDelete) => {
    const updatedComments = currentComments.filter((comment) => comment.id !== commentToDelete.id);

    setCardComments(updatedComments);
  };

  const value = {
    cardComments,
    cardCommentsId,
    setCardCommentsId,
    addToComments,
    editComment,
    getId,
    error
  };

  return <CommentsContext.Provider value={{ value }}>{props.children}</CommentsContext.Provider>;
};
