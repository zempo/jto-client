import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { CardsContextProvider as CardsProvider } from "../../contexts/CardsContext";
import { JtoSection } from "../Utils/Utils";
import PrivateCards from "./PrivateCards";

const UserHome = (props) => {
  const {
    value: { fullName, firstName },
  } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.history.location.state && props.history.location.state.new) {
      props.history.push({
        state: { new: false },
        pathname: "/dashboard",
      });
      window.location.reload();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <JtoSection className='jto-home'>
      <h1 className='animated-h1'>
        Hello,{" "}
        {firstName(fullName).slice(0, 1) +
          firstName(fullName).slice(1).toLowerCase()}
      </h1>
      <CardsProvider>
        <PrivateCards />
      </CardsProvider>
    </JtoSection>
  );
};

export default UserHome;
