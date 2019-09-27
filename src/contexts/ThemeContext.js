import React, { createContext, useState, useEffect } from "react";
// eslint-disable-next-line
import { listCards, listUserCards } from "../services/endpoints-service";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [winHgt, setwinHgt] = useState(window.innerHeight);
  const [winWidth, setwinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setwinHgt(window.innerHeight);
      setwinWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [winWidth]);

  const value = {
    winHgt,
    winWidth
  };

  return <ThemeContext.Provider value={{ value }}>{props.children}</ThemeContext.Provider>;
};
