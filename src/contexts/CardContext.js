import React, { createContext, useState, useEffect } from "react";
import { listCards } from "../services/endpoints-service";

export const CardContext = createContext();

export const CardContextProvider = (props) => {
  const [card, setCard] = useState({});
  const [id, setId] = useState(0);
  const [error, setError] = useState(false);

  const getId = (cardId) => {
    setId(cardId);
  };
  useEffect(() => {
    const cardFound = async () => {
      try {
        // const gotId = await getId;
        // const result = await listCards.get(`/${gotId}`);
        // console.log("hello");
        // console.log(gotId);
        // setCard(result.data);
      } catch (err) {
        if (err.response.status === 401) {
          setError(true);
        }
      }
    };

    cardFound();
    // eslint-disable-next-line
  }, []);

  const value = {
    card,
    id,
    getId,
    error
  };

  return <CardContext.Provider value={{ value }}>{props.children}</CardContext.Provider>;
};
