import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const getUser = (data) => {
    setUser(data);
    return user;
  };

  const catchError = (err) => {
    setError(err);
  };

  const value = {
    user,
    getUser,
    error,
    catchError
  };

  return <UserContext.Provider value={{ value }}>{props.children}</UserContext.Provider>;
};
