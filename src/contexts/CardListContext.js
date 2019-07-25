import React, { createContext, useState } from "react";

export const CardListContext = createContext({
  cardList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCardList: () => {}
});

const CardListProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  return <CardListContext.Provider value={{ cards }}>{props.children}</CardListContext.Provider>;
};

export default CardListProvider;
