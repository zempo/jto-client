import React, { createContext, useState, useEffect } from "react";
import { listUserCards } from "../services/endpoints-service";

export const CardsContext = createContext();

export const CardsContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [currentPg, setCurrentPg] = useState(1);
  const [cardsPerPg, setCardsPerPg] = useState(7);
  // write error message or status state, if exists for notification

  useEffect(() => {
    const cardsFound = async () => {
      try {
        const result = await listUserCards.get("/");

        setCards(result.data);
      } catch (err) {
        setError(true);
      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const indexOfLastCard = currentPg * cardsPerPg;
  const indexOfFirstCard = indexOfLastCard - cardsPerPg;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const value = {
    cards,
    currentPg,
    currentCards,
    error
  };

  return <CardsContext.Provider value={{ value }}>{props.children}</CardsContext.Provider>;
};
