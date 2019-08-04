import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { JtoSection, MenuOption, CheckCard } from "../Utils/Utils";
import { CardContext } from "../../contexts/CardContext";
import TextPlaceholder from "../../images/writing-placeholder.jpg";
import "./css/Cards.css";

const PrivateCards = () => {
  const { value } = useContext(CardContext);

  return (
    <JtoSection className="jto-cards private-cards">
      {value.cards.map((card, i) => {
        return (
          <div key={i} className="jto-card list-card">
            <input type="checkbox" id={`card-toggle-${i}`} className="card-toggle" value="selected" />
            <label className="card-container" htmlFor={`card-toggle-${i}`}>
              <span class="checkmark" />
              {/* <button className="jto-edit">Edit</button>
                <button className="jto-delete">Delete</button> */}
              {/* <div className="jto-options-menu">
                <MenuOption to="/" text="Edit" />
                <MenuOption to="/" text="Delete" />
                <CheckCard />
              </div> */}
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
                <MenuOption to="/" text="Make-Private" />
              </nav>
            </label>
          </div>
        );
      })}
    </JtoSection>
  );
};

export default PrivateCards;
