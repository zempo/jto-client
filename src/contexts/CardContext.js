import React, { createContext, useState, useEffect } from "react";
// eslint-disable-next-line
import { listCards, listUserCards } from "../services/endpoints-service";

export const CardContext = createContext();

export const CardContextProvider = (props) => {
  const [anyCard, setAnyCard] = useState({});
  const [userName, setUserName] = useState("");
  // eslint-disable-next-line
  const [anyCardId, setAnyCardId] = useState(0);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    const cardFound = async () => {
      try {
        // const cardsResult = await listCards.get("/");
        const downloadCard = await listCards.get(`/any/${anyCardId}`);

        // setCardMax(cardsResult.data.length)
        setAnyCard(downloadCard.data);
        setUserName(downloadCard.data.user.user_name);
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    };

    if (anyCardId !== 0) {
      cardFound();
    }
    // eslint-disable-next-line
  }, [anyCardId]);

  const updateId = (newId) => {
    setAnyCardId(newId);
  };

  const value = {
    anyCard,
    anyCardId,
    setAnyCardId,
    userName,
    updateId
  };

  return <CardContext.Provider value={{ value }}>{props.children}</CardContext.Provider>;
};
