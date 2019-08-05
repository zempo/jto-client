import React, { createContext, useState, useEffect } from "react";
import { listCards } from "../services/endpoints-service";

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

        setCards(cardsResult.data);
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

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};

// export default GalleryContextProvider;
