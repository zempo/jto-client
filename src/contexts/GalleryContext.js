import React, { createContext, useState, useEffect } from "react";
import { listActions, listCards } from "../services/endpoints-service";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const [cardsPerPg, setCardsPerPg] = useState(8);
  const [searchCards, setSearchCards] = useState([]);
  const [currentSearchPg, setCurrentSearchPg] = useState(1);
  // eslint-disable-next-line
  const [searchCardsPerPg, setSearchCardsPerPg] = useState(8);
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
        const reactsResult = await listActions.get("/");

        const mergeData = await mergeResults(
          cardsResult.data.payload,
          reactsResult.data.payload
        );

        setLoading(false);
        setCards(mergeData);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };

    cardsFound();
    // eslint-disable-next-line
  }, []);

  const mergeResults = (cardsValue, reactionsValue) => {
    let mergeValues = [];
    for (let i = 0; i < cardsValue.length; i++) {
      mergeValues.push({
        ...cardsValue[i],
        ...reactionsValue.find((itmInner) => itmInner.id === cardsValue[i].id),
      });
    }
    return mergeValues;
  };

  const addToPublicCards = (currentCards, currentSearchCards, newCard) => {
    setCards([...currentCards, newCard]);
    setSearchCards([...currentSearchCards, newCard]);
  };

  const editPublicCard = (currentCards, currentSearchCards, updatedCard) => {
    let cardToEdit = [updatedCard];
    let cardsToEdit = currentCards;
    let searchCardsToEdit = currentSearchCards;
    let editedCards = cardsToEdit.map(
      (obj) => cardToEdit.find((o) => o.id === obj.id) || obj
    );
    let editedSearchCards = searchCardsToEdit.map(
      (obj) => cardToEdit.find((o) => o.id === obj.id) || obj
    );
    // let editted = removeOld.push(commentToEdit);
    setCards(editedCards);
    setSearchCards(editedSearchCards);

    let isIE = false;
    let ua = window.navigator.userAgent;
    let old_ie = ua.indexOf("MSIE ");
    let new_ie = ua.indexOf("Trident/");
    let edge = ua.toLowerCase().indexOf("edge");

    if (old_ie > -1 || new_ie > -1 || edge > -1) {
      isIE = true;
    }

    if (isIE) {
      //IE specific code goes here
      window.location.reload();
    }
  };

  const moveOrDeletePublicCard = (updatedCards, updatedSearchCards) => {
    const newCards = updatedCards;
    const newSearchCards = updatedSearchCards;
    setCards(newCards);
    setSearchCards(newSearchCards);
  };

  let indexOfLastCard = currentPg * cardsPerPg;
  let indexOfFirstCard = indexOfLastCard - cardsPerPg;
  let currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  let lastPg = Math.ceil(cards.length / cardsPerPg);

  let indexOfLastSearch = currentSearchPg * searchCardsPerPg;
  let indexOfFirstSearch = indexOfLastSearch - searchCardsPerPg;
  let currentSearchCards = searchCards.slice(
    indexOfFirstSearch,
    indexOfLastSearch
  );
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
    const compareActions = (key, order = "asc") => {
      return function (a, b) {
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

    if (selection === "new") {
      let sortedGallery = cardsValue.sort(compareDatesDesc);
      return sortedGallery;
    } else if (selection === "likes") {
      let sortByLikes = cardsValue.sort(
        compareActions("number_of_likes", "desc")
      );
      return sortByLikes;
    } else if (selection === "saves") {
      let sortBySaves = cardsValue.sort(
        compareActions("number_of_saves", "desc")
      );
      return sortBySaves;
    } else if (selection === "comments") {
      let sortByComments = cardsValue.sort(
        compareActions("number_of_comments", "desc")
      );
      return sortByComments;
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
    mergeResults,
    arrangeByKeyword,
    arrangeBySelection,
    arrangeByTheme,
    searching,
    setSearching,
    addToPublicCards,
    editPublicCard,
    moveOrDeletePublicCard,
    loading,
    error,
  };

  return (
    <GalleryContext.Provider value={{ value }}>
      {props.children}
    </GalleryContext.Provider>
  );
};
