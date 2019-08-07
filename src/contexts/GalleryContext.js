import React, { createContext, useState, useEffect } from "react";
import { listCards, listReactions } from "../services/endpoints-service";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [cardsComments, setCardsComments] = useState([]);
  const [cardsReacts, setCardsReacts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cardsFound = async () => {
      try {
        const cardsResult = await listCards.get("/");
        // filter and map results based on their id
        const reactsResult = await listReactions.get("/");
        setCards(cardsResult.data);
        console.log(reactsResult.data);
        setCardsReacts(reactsResult.data);
      } catch (err) {
        if (err.response.status === 401) {
          setError(true);
        }
      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const getHeartsForCard = (reactionsValue, cardIndex) => {
    // eslint-disable-next-line
    return reactionsValue.map((reaction, i) => {
      if (i === cardIndex) {
        return reaction.number_of_hearts;
      }
    });
  };

  const getSharesForCard = (reactionsValue, cardIndex) => {
    // eslint-disable-next-line
    return reactionsValue.map((reaction, i) => {
      if (i === cardIndex) {
        return reaction.number_of_shares;
      }
    });
  };

  const value = {
    cards,
    cardsReacts,
    getHeartsForCard,
    getSharesForCard,
    error
  };

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};

// export default GalleryContextProvider;
