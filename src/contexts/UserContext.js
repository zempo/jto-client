import React, { createContext, useState, useEffect } from "react";
import { readUser } from "../services/endpoints-service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const result = await readUser.get("/");

        setLoading(false);
        setUser(result.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const value = {
    user,
    error,
    loading
  };

  return <UserContext.Provider value={{ value }}>{props.children}</UserContext.Provider>;
};
