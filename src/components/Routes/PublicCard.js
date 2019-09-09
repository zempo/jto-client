import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listCardReacts } from "../../services/endpoints-service";
// create nice back-button
import { PostReaction, ToggleReaction } from "../Forms/Social/Reaction";
import { JtoSection, DotMenuOption, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
import { ThemeStyles } from "../Utils/Store/Themes";
import "./css/Card.css";

const PublicCard = (props) => {
  const {
    value: { user }
  } = useContext(UserContext);
  // eslint-disable-next-line
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [comments, setComments] = useState([]);
  const [hasReacted, setHasReacted] = useState({});
  const [cardAuthor, setCardAuthor] = useState({});
  const [cardTheme, setCardTheme] = useState("handwritten");
  const [cardPg, setCardPg] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setCardId(item);

      const cardFound = async () => {
        setLoading(true);
        try {
          const cardResult = await listCards.get(`/${item}`);
          const commentsResult = await listCardComments.get(`/${item}`);
          const hasReacted = await listCardReacts.get(`/${item}`);
          if (hasReacted.data.length > 0) {
            console.log("has reacted", hasReacted.data[0]);
            setHasReacted(hasReacted.data[0]);
          }

          setLoading(false);
          setCard(cardResult.data);
          setCardAuthor(cardResult.data.user);
          setCardTheme(cardResult.data.theme);
          setComments(commentsResult.data);
          console.log(hasReacted.data);
          // console.log(ThemeStyles[`${cardResult.data.theme}`]);
        } catch (err) {
          if (err.response.status === 401) {
            setLoading(false);
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
      {/* eslint-disable-next-line */}
      {card.date_modified == undefined ? (<h3>
        Posted by <span className="username">{cardAuthor.user_name}</span>{" "}
        {<TimeStamp date={card.date_created} />} ago
      </h3>) : <h3>
          Posted by <span className="username">{cardAuthor.user_name}</span>{" "}
          {<TimeStamp date={card.date_created} />} ago. <br /> (Edited {<TimeStamp date={card.date_modified} />} ago).
        </h3>}
      <JtoSection className="jto-card public-card" style={ThemeStyles[`${cardTheme}`].all}>
        <PaginateCardFaces currentPg={cardPg} setCurrentPg={setCardPg} />
        <CardPages card={card} themes={ThemeStyles} cardTheme={cardTheme} cardPg={cardPg} />
      </JtoSection>
      <JtoSection className="jto-reactions">
        {hasReacted.react_heart === undefined && hasReacted.react_share === undefined ? (
          <PostReaction item={card.id} />
        ) : (
            <ToggleReaction item={card.id} liked={hasReacted.react_heart} shared={hasReacted.react_share} />
          )}
        {/* Current user has downloaded. {share ? "true" : "false"} */}
      </JtoSection>
      <JtoSection className="jto-comments">
        <ul>
          {comments.map((comment, i) => {
            return (
              <li className="jto-comment" key={i}>
                {/* add admin icon if admin */}
                {comment.user.admin ? <i className="fas fa-shield-alt" /> : null}
                {comment.user.user_name}
                <ul className="comment-items">
                  <li className="comment-item body">{comment.body}</li>
                  {/* create a date utility */}
                  <li className="comment-item date">{comment.date_created}</li>
                  {comment.date_modified ? <li className="comment-item date">{comment.date_modified}</li> : null}
                  {/* to do: mini dot list menu */}
                  {user.admin || comment.user.user_name === user.user_name ? (
                    <nav className="jto-dot-menu">
                      <input type="checkbox" id={`comment-toggle-${i}`} className="comment-toggle" value="selected" />
                      <label className="comment-menu-container" htmlFor={`comment-toggle-${i}`}>
                        <i className="fas fa-ellipsis-h" />
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
