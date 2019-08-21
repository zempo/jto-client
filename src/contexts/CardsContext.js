import React, { createContext, useState, useEffect } from "react";
import { listUserCards } from "../services/endpoints-service";

export const CardsContext = createContext();

export const CardsContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const [cardsPerPg, setCardsPerPg] = useState(8);
  const [searching, setSearching] = useState(false);
  const [searchCards, setSearchCards] = useState([]);
  const [currentSearchPg, setCurrentSearchPg] = useState(1);
  const [searchCardsPerPg, setSearchCardsPerPg] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // write error message or status state, if exists for notification

  useEffect(() => {
    const cardsFound = async () => {
      setLoading(true);
      try {
        const result = await listUserCards.get("/");

        setLoading(false);
        setCards(result.data);
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

  let indexOfLastSearch = currentSearchPg * searchCardsPerPg;
  let indexOfFirstSearch = indexOfLastSearch - searchCardsPerPg;
  let currentSearchCards = searchCards.slice(indexOfFirstSearch, indexOfLastSearch);
  let lastSearchPg = Math.ceil(searchCards.length / searchCardsPerPg);

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

  const paginateSearch = (e) => {
    const { id } = e.target;

    if (id === "first") {
      setCurrentSearchPg(1);
    } else if (id === "prev") {
      setCurrentSearchPg(currentSearchPg - 1);
    } else if (id === "next") {
      setCurrentSearchPg(currentSearchPg + 1);
    } else if (id === "last") {
      setCurrentSearchPg(lastSearchPg);
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

  const arrangeBySelection = (cardsValue, selection) => {
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
    if (selection === "new") {
      let sortedGallery = cardsValue.sort(compareDatesDesc);
      return sortedGallery;
    } else if (selection === "old") {
      let sortedGallery = cardsValue.sort(compareDatesAsc);
      return sortedGallery;
    } else {
      return cardsValue;
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
    currentPg,
    currentCards,
    cardsPerPg,
    setCurrentPg,
    setCardsPerPg,
    paginate,
    lastPg,
    searchCards,
    currentSearchCards,
    setSearchCards,
    paginateSearch,
    searchCardsPerPg,
    currentSearchPg,
    lastSearchPg,
    arrangeByKeyword,
    arrangeBySelection,
    arrangeByTheme,
    searching,
    setSearching,
    loading,
    error
  };

  return <CardsContext.Provider value={{ value }}>{props.children}</CardsContext.Provider>;
};
