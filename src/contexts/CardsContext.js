import React, { createContext, useState, useEffect } from "react";
import { listUserCards } from "../services/endpoints-service";

export const CardsContext = createContext();

export const CardsContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cardsFound = async () => {
      try {
        const result = await listUserCards.get("/");

        setCards(result.data);
      } catch (err) {
        if (err.response.status === 401) {
          setError(true);
        }
      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const value = {
    cards,
    error
  };

  return <CardsContext.Provider value={{ value }}>{props.children}</CardsContext.Provider>;
};
