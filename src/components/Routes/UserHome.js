import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CardsContextProvider as CardsProvider } from "../../contexts/CardsContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = () => {
  const {
    value: { user }
  } = useContext(UserContext);

  return (
    <JtoSection className="jto-home">
      <h1>Welcome, {user.full_name}</h1>
      <CardsProvider>
        <PrivateCards />
      </CardsProvider>
    </JtoSection>
  );
};

export default UserHome;
