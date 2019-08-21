import React, { useState, useEffect } from "react";
import Modal from "../../modals/Modal";
import { useModal } from "../../hooks/use-modal";
import { JtoQuotes } from "./Store/Quotes";
import { Link } from "react-router-dom";
import { distanceInWordsToNow as formatDate } from "date-fns";
import "./css/Utils.css";

export const Loader = ({ loading }) => {
  // have quotes fade in and out with dynamic styling
  let randomQuote1 = JtoQuotes[~~(Math.random() * JtoQuotes.length)];
  const [quote, setQuote] = useState(randomQuote1);

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

export const SkeletonLoader = ({ loading }) => {
  if (loading) {
    return (
      <>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="skeleton-nav" />
          <div className="spacer" />
        </div>
      </>
    );
  } else {
    return null;
  }
};

export const SkeletonLoader2 = ({ loading }) => {
  if (loading) {
    return (
      <>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
        <div className="card-container loader">
          <div className="skeleton-card-inside" />
          <div className="skeleton-card" />
          <div className="spacer" />
        </div>
      </>
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
      // console.clear();
    }, 5000);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setDisplaying(false);
    // console.clear();
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

export const Hyph = () => {
  return <span className="Hyph">{" - "}</span>;
};

export const CheckCard = () => {
  return (
    <label className="container">
      <input type="checkbox" />
      <span className="checkmark" />
    </label>
  );
};

export const MenuOption = ({ to, text, item_id }) => {
  return (
    <div className="menu-option">
      <Link
        to={{
          pathname: to,
          state: {
            item: item_id
          }
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export const ModalOption = ({ text, toggle }) => {
  return (
    <div className="menu-option">
      <button onClick={toggle}>{text}</button>
    </div>
  );
};

export const DotMenuOption = ({ to, text, item_id }) => {
  return (
    <div className="dot-menu-option">
      <Link
        to={{
          pathname: to,
          state: {
            item: item_id
          }
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export const AddBtn = () => {
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();
  return (
    <>
      <div className="btn btn-add">
        <i className="fas fa-plus fa-3x" title="add card" onClick={toggleAdd} />
      </div>
      <Modal isShowing={isShowingAdd} hide={toggleAdd} action="add-card" />
    </>
  );
};

export const CardPages = ({ card, themes, cardTheme, cardPg }) => {
  if (cardPg === 1) {
    return (
      <div className="front-pg pg" style={themes[`${cardTheme}`].front}>
        <h2>{card.front_message}</h2>
        {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
      </div>
    );
  } else if (cardPg === 2) {
    return (
      <div className="inner-left-pg pg" style={themes[`${cardTheme}`].innerLeft}>
        <p>{card.inside_message}</p>
      </div>
    );
  } else if (cardPg === 3) {
    return (
      <div className="inner-right-pg pg" style={themes[`${cardTheme}`].innerRight}>
        {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
      </div>
    );
  } else {
    return null;
  }
};

export const PaginateCardFaces = ({ currentPg, setCurrentPg }) => {
  const handleClickFront = (e) => {
    setCurrentPg(1);
  };

  const handleClickInnerLeft = (e) => {
    setCurrentPg(2);
  };

  const handleClickInnerRight = (e) => {
    setCurrentPg(3);
  };
  // paginate card faces differently than cards
  return (
    <JtoSection className="paginate-cards">
      <nav className="jto-page-menu">
        <ul>
          <li className="page-menu-item">
            <button id={1} disabled={currentPg === 1} onClick={(e) => handleClickFront(e)} className="page-btn">
              Front
            </button>
          </li>
          <li className="page-menu-item">
            <button id={2} disabled={currentPg === 2} onClick={(e) => handleClickInnerLeft(e)} className="page-btn">
              Inner Message
            </button>
          </li>
          <li className="page-menu-item">
            <button id={3} disabled={currentPg === 3} onClick={(e) => handleClickInnerRight(e)} className="page-btn">
              Inner Image
            </button>
          </li>
        </ul>
      </nav>
    </JtoSection>
  );
};

export const PaginateCards = ({ currentCards, paginate, currentPg, lastPg }) => {
  return (
    <JtoSection className="paginate-cards">
      <nav className="jto-page-menu">
        <ul>
          <li className="page-menu-item">
            <button
              id="first"
              disabled={!currentCards || currentPg === 1}
              onClick={(e) => paginate(e)}
              className="page-btn"
            >
              &#171;
            </button>
          </li>
          <li className="page-menu-item">
            <button
              id="prev"
              disabled={!currentCards || currentPg === 1}
              onClick={(e) => paginate(e)}
              className="page-btn"
            >
              &#60;
            </button>
          </li>
          <li className="page-menu-counter">{Number(currentPg)}</li>
          <li className="page-menu-item">
            <button
              id="next"
              disabled={!currentCards || currentPg === lastPg}
              onClick={(e) => paginate(e)}
              className="page-btn"
            >
              &#62;
            </button>
          </li>
          <li className="page-menu-item">
            <button
              id="last"
              disabled={!currentCards || lastPg === currentPg}
              onClick={(e) => paginate(e)}
              className="page-btn"
            >
              &#187;
            </button>
          </li>
        </ul>
      </nav>
    </JtoSection>
  );
};

export const TimeStamp = ({ date, format = "MMMM Do YYYY" }) => {
  return formatDate(date, format);
};

export const ProcessMsg = (message, maxLength) => {
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "...";
  } else {
    return message;
  }
};

export const ThemesList = () => {
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
};

export const EditThemesList = ({ current }) => {
  return (
    <>
      <option value={current}>Current Font: {current}</option>
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
};
