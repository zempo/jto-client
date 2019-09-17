import React, { createContext, useState, useEffect } from "react";
// eslint-disable-next-line
import { listCards, listCardComments, listCardReacts } from "../services/endpoints-service";

export const PublicCardContext = createContext();

export const PublicCardContextProvider = (props) => {
  const [card, setCard] = useState({});
  // const [cardMax, setCardMax] = useState(1000)
  const [cardAuthor, setCardAuthor] = useState({});
  const [cardTheme, setCardTheme] = useState("handwritten");
  const [hasReacted, setHasReacted] = useState({});
  // eslint-disable-next-line
  const [cardComments, setCardComments] = useState([]);
  const [cardCommentsId, setCardCommentsId] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cardFound = async () => {
      try {
        // const cardsResult = await listCards.get("/");
        const cardResult = await listCards.get(`/${cardCommentsId}`);
        const commentsResult = await listCardComments.get(`/${cardCommentsId}`);
        let result = commentsResult.data.sort(compareDatesAsc);
        const hasReacted = await listCardReacts.get(`/${cardCommentsId}`);
        if (hasReacted.data.length > 0) {
          setHasReacted(hasReacted.data[0]);
        }

        // setCardMax(cardsResult.data.length)
        setCard(cardResult.data);
        setCardAuthor(cardResult.data.user);
        setCardTheme(cardResult.data.theme);
        setCardComments(result);
      } catch (err) {
        if (err.response.status === 401) {
          setError(true);
        }
      }
    };

    cardFound();
    // eslint-disable-next-line
  }, [cardCommentsId]);

  const getId = (cardId) => {
    setCardCommentsId(cardId);
  };

  // const nextCard = (currentId, currentMax) => {
  //   if (currentId === currentMax) {
  //     setCardCommentsId(currentId + 1)
  //   }
  // }

  // const prevCard = (currentId) => {
  //   if (currentId > 1) {

  //   }
  // }

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

  const addToComments = (currentComments, newComment) => {
    setCardComments([...currentComments, newComment]);
  };

  const editComment = (currentComments, updatedComment) => {
    let commentToEdit = [updatedComment];
    let commentsToEdit = currentComments;
    let edited = commentsToEdit.map((obj) => commentToEdit.find((o) => o.id === obj.id) || obj);
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
    card,
    cardTheme,
    cardAuthor,
    hasReacted,
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

  return <PublicCardContext.Provider value={{ value }}>{props.children}</PublicCardContext.Provider>;
};
