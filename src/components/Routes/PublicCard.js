import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
// create back-button
import { JtoSection, Loader, DotMenuOption, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
import { ThemeStyles } from "../Utils/Themes";
import "./css/Card.css";

const PublicCard = (props) => {
  const {
    value: { user }
  } = useContext(UserContext);
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [comments, setComments] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [shares, setShares] = useState([]);
  const [cardAuthor, setCardAuthor] = useState({});
  const [cardTheme, setCardTheme] = useState("handwritten");
  const [cardPg, setCardPg] = useState(1);
  const [loading, setLoading] = useState(false);
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
          const heartsResult = await listHearts.get(`/${item}`);
          const sharesResult = await listShares.get(`/${item}`);

          setLoading(false);
          setCard(cardResult.data);
          setCardAuthor(cardResult.data.user);
          setCardTheme(cardResult.data.theme);
          setComments(commentsResult.data);
          setHearts(heartsResult.data);
          setShares(sharesResult.data);
          console.log(cardResult.data);
          console.log(heartsResult.data);
          console.log(sharesResult.data);
          console.log(commentsResult.data);
          console.log(ThemeStyles[`${cardResult.data.theme}`]);
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
      <h3>
        Created by {cardAuthor.user_name} on {<TimeStamp date={cardAuthor.date_created} />}
      </h3>
      {/* {loading ? (
        <Loader loading={true} />
      ) : (
        <>
          <h2>
            Created by {cardAuthor.user_name} on {<TimeStamp date={cardAuthor.date_created} />}
          </h2>
          <Loader loading={false} />
        </>
      )} */}
      <JtoSection className="jto-card public-card" style={ThemeStyles[`${cardTheme}`].all}>
        {/* style={Object.assign({}, ThemeStyles[`${cardTheme}`].all, ThemeStyles[`${cardTheme}`].front) */}
        <CardPages card={card} themes={ThemeStyles} cardTheme={cardTheme} cardPg={cardPg} />
        <PaginateCardFaces currentPg={cardPg} setCurrentPg={setCardPg} />
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