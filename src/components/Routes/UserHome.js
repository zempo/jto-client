import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CardsContextProvider as CardsProvider } from "../../contexts/CardsContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = () => {
  const { value } = useContext(UserContext);

  return (
    <JtoSection className="jto-page home">
      <h1>Welcome, {value.user.full_name}</h1>
      <CardsProvider>
        <PrivateCards />
      </CardsProvider>
    </JtoSection>
  );
};

export default UserHome;
