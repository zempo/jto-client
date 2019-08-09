import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
import TokenService from "../../services/token-service";
// create back-button
import { JtoSection, JtoNotification, DotMenuOption } from "../Utils/Utils";
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

  useEffect(() => {
    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setCardId(item);

      const cardFound = async () => {
        try {
          const cardResult = await listCards.get(`/${item}`);
          const commentsResult = await listCardComments.get(`/${item}`);
          const heartsResult = await listHearts.get(`/${item}`);
          const sharesResult = await listShares.get(`/${item}`);

          setCard(cardResult.data);
          setCardAuthor(cardResult.data.user);
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
        <h2>Written by {cardAuthor.user_name}</h2>
        <div className="">
          <p>{card.front_message}</p>
          {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
        </div>
        <div className="">
          <p>{card.inside_message}</p>
        </div>
        <div className="">
          {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
        </div>
      </JtoSection>
      <JtoSection className="jto-reactions">
        Hearts {hearts.length}
        Shares {shares.length}
      </JtoSection>
      <JtoSection className="jto-comments">
        <ul>
          {comments.map((comment, i) => {
            return (
              <li className="jto-comment" key={i}>
                {/* add admin icon if admin */}
                {comment.user.user_name}
                {comment.user.admin ? <i class="fas fa-shield-alt" /> : null}
                <ul className="comment-items">
                  <li className="comment-item body">{comment.body}</li>
                  {/* create a date utility */}
                  <li className="comment-item date">{comment.date_created}</li>
                  {comment.date_modified ? <li className="comment-item date">{comment.date_modified}</li> : null}
                  {/* to do: mini dot list menu */}
                  {value.user.admin || comment.user.user_name === value.user.user_name ? (
                    <nav className="jto-dot-menu">
                      <input type="checkbox" id={`comment-toggle-${i}`} className="comment-toggle" value="selected" />
                      <label className="comment-menu-container" htmlFor={`comment-toggle-${i}`}>
                        <i class="fas fa-ellipsis-h" />
                        <DotMenuOption to="/edit-comment" text="Edit" item_id={comment.id} />
                        <DotMenuOption to="/delete-comment" text="Delete" item_id={comment.id} />
                      </label>
                    </nav>
                  ) : null}
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
