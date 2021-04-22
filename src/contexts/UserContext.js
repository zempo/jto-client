import React, { createContext, useState, useEffect } from "react";
import { readUser, readPublicUser } from "../services/endpoints-service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [fullName, setFullName] = useState("Jane");
  const [user, setUser] = useState({});
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setError(0);
      try {
        const result = await readUser.get("/");

        setLoading(false);
        setUser(result.data.payload);
        setFullName(result.data.payload.full_name);
        setError(0);
      } catch (err) {
        setError(err.response.status);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const queryUser = async (id) => {
    try {
      const result = await readPublicUser.get(`/${id}`);

      return result.data.payload;
    } catch (err2) {
      console.log(err2);
    }
  };

  const firstName = (word) => {
    let stop = word.indexOf(" ");
    return word.slice(0, stop);
  };

  const value = {
    user,
    queryUser,
    fullName,
    firstName,
    error,
    loading,
  };

  return (
    <UserContext.Provider value={{ value }}>
      {props.children}
    </UserContext.Provider>
  );
};
