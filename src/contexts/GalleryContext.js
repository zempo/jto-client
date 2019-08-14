import React, { createContext, useState, useEffect } from "react";
import { listCards, listReactions } from "../services/endpoints-service";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [searchCards, setSearchCards] = useState([]);
  const [cardsReacts, setCardsReacts] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  // eslint-disable-next-line
  const [cardsPerPg, setCardsPerPg] = useState(8);
  const [searching, setSearching] = useState(false);
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

  let indexOfLastCard = currentPg * cardsPerPg;
  let indexOfFirstCard = indexOfLastCard - cardsPerPg;
  let currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  let lastPg = Math.ceil(cards.length / cardsPerPg);

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
    if (keyword) {
      const byKeyword = cardsValue.filter((card) => {
        let front = card.front_message.toLowerCase();
        let inside = card.inside_message.toLowerCase();
        let searchTerm = keyword.toLowerCase();
        if (front.includes(searchTerm)) {
          return 1;
        } else if (inside.includes(searchTerm)) {
          return 1;
        } else {
          return 0;
        }
      });

      return byKeyword;
    } else {
      return cardsValue;
    }
  };

  const arrangeBySelection = (cardsValue, reactionsValue, selection) => {
    const compareDatesAsc = (a, b) => {
      const dateA = Date.parse(a.date_created);
      const dateB = Date.parse(b.date_created);

      let comparison = 0;
      if (dateA > dateB) {
        comparison = 1;
      } else if (dateA < dateB) {
        comparison = -1;
      }
      return comparison;
    };

    const compareDatesDesc = (a, b) => {
      const dateA = Date.parse(a.date_created);
      const dateB = Date.parse(b.date_created);

      let comparison = 0;
      if (dateA > dateB) {
        comparison = 1;
      } else if (dateA < dateB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    const compareReactions = (key, order = "asc") => {
      return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        // eslint-disable-next-line
        return order == "desc" ? comparison * -1 : comparison;
      };
    };
    if (selection === "recent") {
      let sortedGallery = cardsValue.sort(compareDatesDesc);
      setSearchCards(sortedGallery);
    } else if (selection === "popular") {
      let mergeValues = [];
      for (let i = 0; i < cardsValue.length; i++) {
        mergeValues.push({
          ...cardsValue[i],
          ...reactionsValue.find((itmInner) => itmInner.id === cardsValue[i].id)
        });
      }
      let sortByHearts = mergeValues.sort(compareReactions("number_of_hearts", "desc"));
      let sortByShares = sortByHearts.sort(compareReactions("number_of_shares", "desc"));
      let sortByComments = sortByShares.sort(compareReactions("number_of_comments", "desc"));
      // exclude reaction props
      let sortedGallery = sortByComments.map(({ number_of_hearts, number_of_shares, user_id, ...rest }) => rest);

      setSearchCards(sortedGallery);
    } else if (selection === "ancient") {
      let sortedGallery = cardsValue.sort(compareDatesAsc);
      setSearchCards(sortedGallery);
    } else {
      setSearchCards(cardsValue);
    }
  };

  const arrangeByTheme = (cardsValue, theme) => {
    if (theme) {
      const byTheme = cardsValue.filter((card) => {
        if (card.theme === theme) {
          return 1;
        } else {
          return 0;
        }
      });

      return byTheme;
    } else {
      return cardsValue;
    }
  };

  const value = {
    cards,
    paginate,
    currentPg,
    setCurrentPg,
    cardsPerPg,
    setCardsPerPg,
    currentCards,
    cardsReacts,
    lastPg,
    getHeartsForCard,
    getSharesForCard,
    arrangeByKeyword,
    arrangeBySelection,
    arrangeByTheme,
    searchCards,
    setSearchCards,
    searching,
    setSearching,
    loading,
    error
  };

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};
