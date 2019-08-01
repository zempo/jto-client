import React, { createContext, useState, useEffect } from "react";
import { listUserCards } from "../services/endpoints-service";

export const CardContext = createContext();

export const CardContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cardsFound = async () => {
      const result = await listUserCards.get("/");

      setCards(result.data);
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const catchError = (err) => {
    setError(err);
  };

  const value = {
    cards,
    error,
    catchError
  };

  return <CardContext.Provider value={{ value }}>{props.children}</CardContext.Provider>;
};
