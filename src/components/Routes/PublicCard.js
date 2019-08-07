import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
// import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
// create back-button
import { JtoSection, JtoNotification } from "../Utils/Utils";
import "./css/Card.css";

const PublicCard = (props) => {
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [comments, setComments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [shares, setShares] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.location.state.item !== null) {
      const { item } = props.location.state;
      setCardId(item);

      const cardFound = async () => {
        try {
          const cardResult = await listCards.get(`/${item}`);
          const commentsResult = await listCardComments.get(`/${item}`);
          const heartsResult = await listHearts.get(`/${item}`);
          const sharesResult = await listShares.get(`/${item}`);

          setCard(cardResult.data);
          setComments(commentsResult.data);
          setHearts(heartsResult.data);
          setShares(sharesResult.data);
          console.log(cardResult.data);
          console.log(heartsResult.data);
          console.log(sharesResult.data);
          console.log(commentsResult.data);
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
        <input type="checkbox" id={`card-toggle-${card.id}`} className="card-toggle" value="selected" />
        <label className="card-container" htmlFor={`card-toggle-${card.id}`}>
          <span className="checkmark3" />
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
      </JtoSection>
      <JtoSection className="jto-reactions">
        Heart React? {hearts.length > 0 ? hearts[0].react_heart : null}
        {/* {hearts[0].react_heart} */}
        {/* Share React? {hearts[0].react_share} */}
      </JtoSection>
      <JtoSection className="jto-comments">
        {comments.map((comment, i) => {
          return (
            <div className="jto-comment" key={i}>
              <p>{comment.body}</p>
            </div>
          );
        })}
      </JtoSection>
    </>
  );
};

export default PublicCard;
