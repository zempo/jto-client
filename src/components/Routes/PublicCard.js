import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
// create back-button
import { JtoSection, JtoNotification } from "../Utils/Utils";
import "./css/Card.css";

const PublicCard = (props) => {
  const { value } = useContext(UserContext);
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [comments, setComments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [shares, setShares] = useState([]);
  const [cardAuthor, setCardAuthor] = useState({});
  const [error, setError] = useState(false);
  const [commentUsrs, setCommentUsrs] = useState([]);

  useEffect(() => {
    if (props.location.state.item !== null) {
      const { item } = props.location.state;
      setCardId(item);

      const cardFound = async () => {
        try {
          const cardResult = await listCards.get(`/${item}`);
          const commentsResult = await listCardComments.get(`/${item}`);
          const getCommentUsrs = await commentsResult.data.map((comment) => {
            return value.queryUser(comment.user_id).then((res) => {
              setCommentUsrs([...commentUsrs, res]);
            });
          });
          const heartsResult = await listHearts.get(`/${item}`);
          const sharesResult = await listShares.get(`/${item}`);

          setCommentUsrs(
            commentsResult.data.map((comment) => {
              return value.queryUser(comment.user_id);
            })
          );

          setCard(cardResult.data);
          setCardAuthor(cardResult.data.user);
          setComments(commentsResult.data);
          setHearts(heartsResult.data);
          setShares(sharesResult.data);
          console.log(cardResult.data);
          console.log(heartsResult.data);
          console.log(sharesResult.data);
          console.log(commentsResult.data);
          console.log(getCommentUsrs);
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
      <JtoSection className="jto-card">
        {/* load an array of custom styles from a utilities page. style={getTheme(card.theme, themes context)} */}
        <h2>Written by {cardAuthor.user_name}</h2>
        {/* {card.user.user_name != undefined ? <h2>Written by {card.user.user_name}</h2> : null} */}
        <input type="checkbox" id={`card-toggle-${card.id}`} className="card-toggle" value="selected" />
        <label className="display-card-container" htmlFor={`card-toggle-${card.id}`}>
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
        {console.log(commentUsrs)}
        <ul>
          {comments.map((comment, i) => {
            return (
              <li className="jto-comment" key={i}>
                <ul>
                  <li>{comment.body}</li>
                  {/* create a date utility */}
                  <li>{comment.date_created}</li>
                  {/* {comment.date_modified ? } */}
                </ul>
              </li>
            );
          })}
        </ul>
      </JtoSection>
    </>
  );
};

export default PublicCard;
