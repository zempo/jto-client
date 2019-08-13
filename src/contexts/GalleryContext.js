import React, { createContext, useState, useEffect } from "react";
import { listCards, listReactions } from "../services/endpoints-service";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [cardsReacts, setCardsReacts] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  // eslint-disable-next-line
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
  const lastPg = Math.ceil(cards.length / cardsPerPg);

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

  const arrangeByKeyword = (cardsValue, keyword) => {
    const byKeyword = cardsValue.filter((card) => {
      // card["inside_mesage"].includes(keyword) || card["front_message"].includes(keyword)
      if (card.front_message.includes(keyword)) {
        // console.log(card.front_message);
        return 1;
      } else if (card.inside_message.includes(keyword)) {
        return 1;
      } else {
        return 0;
      }
    });
    // .map((card) => {
    //   // console.log(card["inside_message"]);
    //   return card;
    // });

    // console.log(byKeyword);

    setCards(byKeyword);
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
    arrangeByKeyword,
    loading,
    error
  };

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};

// export default GalleryContextProvider;
