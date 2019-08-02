import React, { useEffect, useState, useContext } from "react";
import { JtoSection } from "../Utils/Utils";
import { CardContext } from "../../contexts/CardContext";
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
              <div className="front face">
                <p>{card.front_message}</p>
                {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
              </div>
              <div className="inner-left face">
                <p>{card.inside_message}</p>
              </div>
              <div className="inner-right face">
                {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
              </div>
            </label>
          </div>
        );
      })}
    </JtoSection>
  );
};

export default PrivateCards;
