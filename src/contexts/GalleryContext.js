import React, { createContext, useState } from "react";

export const GalleryContext = createContext();

export const GalleryContextProvider = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  const value = {
    cards,
    error
  };

  return <GalleryContext.Provider value={{ value }}>{props.children}</GalleryContext.Provider>;
};

// export default GalleryContextProvider;
