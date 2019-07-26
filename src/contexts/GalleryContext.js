import React, { createContext, useState } from "react";

export const GalleryContext = createContext({
  cards: "fuck context"
});

const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState("fuck context");
  // const [error, setError] = useState(false);

  // const value = {
  //   cards,
  //   error
  // };

  return <GalleryContext.Provider value={{ cards }}>{props.children}</GalleryContext.Provider>;
};

export default GalleryContextProvider;
