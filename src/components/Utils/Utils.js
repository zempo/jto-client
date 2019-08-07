import React, { useState, useEffect } from "react";
import { JtoQuotes } from "./Quotes";
import { Link } from "react-router-dom";
// import { format as formatDate } from "date-fns";
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

export function Hyph() {
  return <span className="Hyph">{" - "}</span>;
}

export function CheckCard() {
  return (
    <label className="container">
      <input type="checkbox" />
      <span className="checkmark" />
    </label>
  );
}

export function MenuOption({ to, text }) {
  return (
    <div className="menu-option">
      <Link to={to}>{text}</Link>
    </div>
  );
}

export function AddBtn() {
  return (
    <div className="btn btn-add">
      <Link to="/add-occasion">
        <i className="fas fa-plus fa-3x" />
      </Link>
    </div>
  );
}

export function ThemesList() {
  return (
    <>
      <option value="cursive">Cursive</option>
      <option value="cursive-plus">Cursive+</option>
      <option value="handwritten">Handwritten</option>
      <option value="handwritten-bold">Handwritten Bold</option>
      <option value="indie">Indie</option>
      <option value="kiddo">Kiddo</option>
      <option value="pen">Pen</option>
      <option value="sharpie">Sharpie</option>
      <option value="roboto">Roboto</option>
      <option value="typed">Typed</option>
      <option value="quill">Quill</option>
    </>
  );
}
