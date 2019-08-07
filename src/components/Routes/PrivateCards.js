import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { JtoSection, MenuOption, AddBtn } from "../Utils/Utils";
import { CardsContext } from "../../contexts/CardsContext";
import TextPlaceholder from "../../images/writing-placeholder.jpg";
import "./css/Cards.css";

const PrivateCards = () => {
  const { value } = useContext(CardsContext);

  return !value.error ? (
    <JtoSection className="jto-cards private-cards">
      {/* make empty card with question mark and big "start creating Occasions button" */}
      {value.cards.map((card, i) => {
        return (
          <div key={i} className="jto-card list-card">
            <input type="checkbox" id={`card-toggle-${i}`} className="card-toggle" value="selected" />
            <label className="card-container" htmlFor={`card-toggle-${i}`}>
              <span className="checkmark" />
              <div className="front face">
                <p>{card.front_message}</p>
                {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
              </div>
              <div className="inner-left face">
                <img src={TextPlaceholder} alt="front background" />
              </div>
              <div className="inner-right face">
                {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
              </div>
              <nav className="jto-mini-menu">
                <MenuOption to="/" text="Edit" />
                <MenuOption to="/" text="Delete" />
                <MenuOption to="/" text="Download" />
                <MenuOption to="/" text="Make-Public" />
              </nav>
            </label>
          </div>
        );
      })}
      <div className="card-container">
        <AddBtn />
      </div>
    </JtoSection>
  ) : (
    <Redirect from="/private" to="/login" />
  );
};

export default PrivateCards;
