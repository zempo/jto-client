import React, { createContext, useState } from "react";

export const CardListContext = createContext({
  cardList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCardList: () => {}
});

const CardListProvider = (props) => {
  const [cardList, setCardList] = useState([]);
  const [error, setError] = useState(null);

  const value = {
    cardList,
    error,
    setCardList,
    setError
  };

  return <CardListContext.Provider value={value}>{props.children}</CardListContext.Provider>;
};

export default CardListProvider;
