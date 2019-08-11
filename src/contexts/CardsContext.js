import React, { createContext, useState, useEffect } from "react";
import { listUserCards } from "../services/endpoints-service";

export const CardsContext = createContext();

export const CardsContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [currentPg, setCurrentPg] = useState(1);
  const [cardsPerPg, setCardsPerPg] = useState(7);
  const [loading, setLoading] = useState(false)
  // write error message or status state, if exists for notification

  useEffect(() => {
    const cardsFound = async () => {
      setLoading(true)
      try {
        const result = await listUserCards.get("/");

        setLoading(false)
        setCards(result.data);
      } catch (err) {
        setLoading(false)
        setError(true);

      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const indexOfLastCard = currentPg * cardsPerPg;
  const indexOfFirstCard = indexOfLastCard - cardsPerPg;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const lastPg = (cards.length / cardsPerPg)

  const paginate = (e) => {
    const { id } = e.target

    if (id === 'first') {
      setCurrentPg(1)
    } else if (id === 'prev') {
      setCurrentPg(currentPg - 1)
    } else if (id === 'next') {
      setCurrentPg(currentPg + 1)
    } else if (id === 'last') {
      setCurrentPg(lastPg)
    }
  }

  const value = {
    cards,
    paginate,
    currentPg,
    cardsPerPg,
    currentCards,
    lastPg,
    loading,
    error
  };

  return <CardsContext.Provider value={{ value }}>{props.children}</CardsContext.Provider>;
};
