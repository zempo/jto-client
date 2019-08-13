import React, { createContext, useState, useEffect } from "react";
import { listCards, listReactions } from "../services/endpoints-service";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [cardsReacts, setCardsReacts] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const [cardsPerPg, setCardsPerPg] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // write error status and message state if exists, for notification

  useEffect(() => {
    const cardsFound = async () => {
      setLoading(true);
      try {
        const cardsResult = await listCards.get("/");
        // filter and map results based on their id
        const reactsResult = await listReactions.get("/");

        setLoading(false);
        setCards(cardsResult.data);
        setCardsReacts(reactsResult.data);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const indexOfLastCard = currentPg * cardsPerPg;
  const indexOfFirstCard = indexOfLastCard - cardsPerPg;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const lastPg = cards.length / cardsPerPg;

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

  const paginate = (e) => {
    const { id } = e.target;

    if (id === "first") {
      setCurrentPg(1);
    } else if (id === "prev") {
      setCurrentPg(currentPg - 1);
    } else if (id === "next") {
      setCurrentPg(currentPg + 1);
    } else if (id === "last") {
      setCurrentPg(lastPg);
    }
  };

  const value = {
    cards,
    paginate,
    currentPg,
    cardsPerPg,
    currentCards,
    cardsReacts,
    lastPg,
    getHeartsForCard,
    getSharesForCard,
    loading,
    error
  };

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};

// export default GalleryContextProvider;
