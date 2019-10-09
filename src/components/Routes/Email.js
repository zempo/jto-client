import React, { useEffect } from "react";
import PageUnderConstruction from "../../images/construction.svg";

const Email = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1 className="animated-h1">Coming Soon</h1>
      <h2 className="animated-h2">We're working as fast as we can!</h2>
      <img src={PageUnderConstruction} alt="this page is under construction" />
    </>
  );
};

export default Email;
