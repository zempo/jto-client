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

  const compareDatesAsc = (a, b) => {
    // old comments first
    const dateA = Date.parse(a.date_created);
    const dateB = Date.parse(b.date_created);
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  };

  const compareDatesDesc = (a, b) => {
    // new comments first
    const dateA = Date.parse(a.date_created);
    const dateB = Date.parse(b.date_created);
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison * -1;
  };

  useEffect(() => {
    const cardFound = async () => {
      try {
        const commentsResult = await listCardComments.get(`/${cardCommentsId}`);
        let result = commentsResult.data.sort(compareDatesAsc);
        // console.log("hello");
        setCardComments(result);
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

  const addToComments = (currentComments, newComment) => {
    setCardComments([...currentComments, newComment]);
  };

  const editComment = (currentComments, updatedComment) => {
    let commentToEdit = [updatedComment];
    let commentsToEdit = currentComments;
    let edited = commentsToEdit.map((obj) => commentToEdit.find((o) => o.id === obj.id) || obj);

    console.log(edited);
    // let editted = removeOld.push(commentToEdit);
    setCardComments(edited);
    let isIE = false;
    let ua = window.navigator.userAgent;
    let old_ie = ua.indexOf("MSIE ");
    let new_ie = ua.indexOf("Trident/");

    if (old_ie > -1 || new_ie > -1) {
      isIE = true;
    }

    if (isIE) {
      //IE specific code goes here
      window.location.reload();
    }
  };

  const deleteComment = (currentComments, commentToDelete) => {
    const updatedComments = currentComments.filter((comment) => comment.id !== commentToDelete.id);

    setCardComments(updatedComments);
  };

  const value = {
    cardComments,
    setCardComments,
    cardCommentsId,
    setCardCommentsId,
    addToComments,
    editComment,
    deleteComment,
    compareDatesAsc,
    compareDatesDesc,
    getId,
    error
  };

  return <CommentsContext.Provider value={{ value }}>{props.children}</CommentsContext.Provider>;
};
