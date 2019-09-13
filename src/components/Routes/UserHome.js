import React, { useContext } from "react";
import Fade from "react-reveal/Fade";
import { UserContext } from "../../contexts/UserContext";
import { CardsContextProvider as CardsProvider } from "../../contexts/CardsContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = () => {
  const {
    value: { fullName, firstName }
  } = useContext(UserContext);

  return (
    <JtoSection className="jto-home">
      <Fade>
        <h1>Hello, {firstName(fullName)}</h1>
      </Fade>
      <CardsProvider>
        <PrivateCards />
      </CardsProvider>
    </JtoSection>
  );
};

export default UserHome;
