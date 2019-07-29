import React, { useState, useEffect } from "react";
import { JtoQuotes } from "./Quotes";
import { format as formatDate } from "date-fns";
import "./css/Utils.css";

export const Loader = ({ loading }) => {
  const randomQuote = JtoQuotes[~~(Math.random() * JtoQuotes.length)];

  let run = setInterval(() => {
    console.log("new quote");
    return (
      <div className="jto-loader">
        <h3>{randomQuote}</h3>
      </div>
    );
  }, 2000);
  if (loading) {
    return run;
  } else {
    clearInterval(run);
  }
};

export const Required = ({ met }) => {
  if (!met) {
    return <span className="required">&#42;</span>;
  } else {
    return <span className="met">&#10003;</span>;
  }
};

export const JtoNotification = ({ type, msg }) => {
  const [displaying, setDisplaying] = useState(false);
  useEffect(() => {
    setDisplaying(true);
    setTimeout(() => {
      setDisplaying(false);
      console.clear();
    }, 5000);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setDisplaying(false);
    console.clear();
  };
  if (displaying) {
    return (
      <div className={["jto-notification", type].join(" ")}>
        <h2>
          <i className="fas fa-exclamation" />
          {msg}
        </h2>
        <button onClick={handleClick}>
          <i className="fas fa-times-circle" />
        </button>
      </div>
    );
  } else {
    return null;
  }
};
