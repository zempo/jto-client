import React, { useState, useEffect } from "react";
import { JtoQuotes } from "./Quotes";
import { format as formatDate } from "date-fns";
import "./css/Utils.css";

export const Loader = ({ loading }) => {
  // have quotes fade in and out with dynamic styling
  let randomQuote1 = JtoQuotes[~~(Math.random() * JtoQuotes.length)];
  const [quote, setQuote] = useState(randomQuote1);

  // useEffect(() => {
  //   // clear on mount
  //   const cleanup = () => {
  //     console.clear();
  //   };
  //   return cleanup;
  // }, []);

  useEffect(() => {
    // conditional prevents memory leak
    if (loading === true) {
      let randomQuote2 = JtoQuotes[~~(Math.random() * JtoQuotes.length)];
      setTimeout(() => {
        setQuote(randomQuote2);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [loading]);

  if (loading) {
    return (
      <div className="jto-loader">
        <h3>{quote}</h3>
      </div>
    );
  } else {
    return null;
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
  // created centered checkmark or x
  // below display message and surround with colored border
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
      <div id={type} className="jto-notification">
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

export function JtoSection({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className].filter(Boolean).join(" ");
  return <section className={classes} {...props} />;
}
