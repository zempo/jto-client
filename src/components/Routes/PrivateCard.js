import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
import TokenService from "../../services/token-service";
// create back-button
import { JtoSection, JtoNotification, DotMenuOption } from "../Utils/Utils";
import "./css/Card.css";

const Private = (props) => {
  const { value } = useContext(UserContext);
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [comments, setComments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [shares, setShares] = useState([]);
  const [cardAuthor, setCardAuthor] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setCardId(item);

      const cardFound = async () => {
        try {
          const cardResult = await listCards.get(`/${item}`);

          setCard(cardResult.data);
          setCardAuthor(cardResult.data.user);
          console.log(cardResult.data);
        } catch (err) {
          if (err.response.status === 401) {
            setError(true);
          }
        }
      };

      cardFound();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <JtoSection className="jto-card public-card">
        {/* load an array of custom styles from a utilities page. style={getTheme(card.theme, themes context)} */}
        <h2>Written by {cardAuthor.user_name}</h2>
        <div className="card-face front-pg">
          <p>{card.front_message}</p>
          {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
        </div>
        <div className="card-face inner-left-pg">
          <p>{card.inside_message}</p>
        </div>
        <div className="card-face inner-right-pg">
          {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
        </div>
      </JtoSection>
    </>
  );
};

export default Private;
