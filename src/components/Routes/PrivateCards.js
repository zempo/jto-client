import React, { useEffect, useState, useContext } from "react";
import { JtoSection } from "../Utils/Utils";
import { listUserCards } from "../../services/endpoints-service";
import TokenService from "../../services/token-service";
import { CardContext } from "../../contexts/CardContext";
import Config from "../../config";

const PrivateCards = () => {
  const { value } = useContext(CardContext);

  return (
    <JtoSection className="jto-cards private-cards">
      {value.cards.map((card, i) => {
        return (
          <div key={i} className="jto-card from-list">
            <input type="checkbox" id={`card-toggle-${i}`} class="card-toggle" value="selected" />
            <label class="card-container" for={`card-toggle-${i}`}>
              <div class="front face">
                <p>{card.front_message}</p>
                {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
              </div>
              <div class="inner-left face">
                <p>{card.inside_message}</p>
              </div>
              <div class="inner-right face">
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