import React, { useContext } from "react";
import Config from "../../config";
import TokenService from "../../services/token-service";
import { UserContext } from "../../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../../contexts/CardContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = () => {
  const { value } = useContext(UserContext);

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
