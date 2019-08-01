import React, { useEffect, useState, useContext } from "react";
import Config from "../../config";
import TokenService from "../../services/token-service";
import { readUser } from "../../services/endpoints-service";
import { UserContext } from "../../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../../contexts/CardContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = () => {
  const [url, setUrl] = useState(`${Config.API_ENDPOINT}/users/${TokenService.getId()}`);
  const { value } = useContext(UserContext);
  useEffect(() => {
    const userFound = async () => {
      const result = await readUser.get("/").then((res) => {
        return res.data;
      });

      value.getUser(result);
    };

    userFound();
    // eslint-disable-next-line
  }, []);

  return (
    <JtoSection className="jto-page home">
      <h1>Welcome, {value.user.full_name}</h1>
      <CardProvider>
        <PrivateCards />
      </CardProvider>
    </JtoSection>
  );
};

export default UserHome;
