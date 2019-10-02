import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { PublicCardContext as CardContext } from "../../contexts/PublicCardContext";
import { listCardReacts, listUserCards, newCard } from "../../services/endpoints-service";
import { useModal } from "../../hooks/use-modal";
import BottomModal from "../../modals/BottomModal";
// create nice back-button
import { PostReaction, ToggleReaction } from "../Forms/Social/Reaction";
import { JtoSection, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
import { ThemeStyles } from "../Utils/Store/Themes";
import "./css/Card.css";

const PublicCard = (props) => {
  const { isShowing: isShowingCommentAdd, toggle: toggleCommentAdd } = useModal();
  const { isShowing: isShowingCommentEdit, toggle: toggleCommentEdit } = useModal();
  const { isShowing: isShowingCommentDelete, toggle: toggleCommentDelete } = useModal();
  const {
    value: { user }
  } = useContext(UserContext);
  const {
    value: { card, cardTheme, cardAuthor, cardComments, cardCommentsId, setCardCommentsId }
  } = useContext(CardContext);
  const [currentId, setCurrentId] = useState(0);
  const [currentBody, setCurrentBody] = useState("");
  const [hasReacted, setHasReacted] = useState({});
  const [cardPg, setCardPg] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setCardCommentsId(item);

      const cardFound = async () => {
        setLoading(true);
        try {
          const hasReacted = await listCardReacts.get(`/${item}`);
          if (hasReacted.data.length > 0) {
            setHasReacted(hasReacted.data[0]);
          }

          setLoading(false);
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

  const openEdit = (id, body) => {
    setCurrentId(id);
    setCurrentBody(body);
    toggleCommentEdit();
  };

  const openDelete = (id) => {
    setCurrentId(id);
    toggleCommentDelete();
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    let { inside_message, inside_image, front_image, theme, front_message } = card;
    let cardCopy = { front_message, inside_message, theme };
    if (inside_image !== "" && front_image !== "") {
      cardCopy.front_image = front_image;
      cardCopy.inside_image = inside_image;
    } else if (inside_image !== "" && front_image === "") {
      cardCopy.inside_image = inside_image;
    } else if (front_image !== "" && inside_image === "") {
      cardCopy.front_image = front_image;
    }

    try {
      let sendFullData = await newCard.post("/", cardCopy);

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="public-card-page">
      {/* eslint-disable-next-line */}
      {card.date_modified == undefined ? (
        <h2>
          Created by{" "}
          <span className="username">{cardAuthor.user_name === user.user_name ? "you, " : cardAuthor.user_name}</span>{" "}
          {<TimeStamp date={card.date_created} />} ago
        </h2>
      ) : (
        <h2>
          Created by{" "}
          <span className="username">{cardAuthor.user_name === user.user_name ? "you, " : cardAuthor.user_name}</span>{" "}
          {<TimeStamp date={card.date_created} />} ago. <br /> (Edited {<TimeStamp date={card.date_modified} />} ago).
        </h2>
      )}
      <JtoSection className="jto-card public-card" style={ThemeStyles[`${cardTheme}`].all}>
        {cardAuthor.user_name === user.user_name ? null : (
          <i className="far fa-copy fa-2x" onClick={handleCopy}>
            &nbsp; Save Card
          </i>
        )}
        <PaginateCardFaces currentPg={cardPg} setCurrentPg={setCardPg} />
        <CardPages card={card} themes={ThemeStyles} cardTheme={cardTheme} cardPg={cardPg} />
      </JtoSection>
      <JtoSection className="jto-reactions">
        {hasReacted.react_heart === undefined && hasReacted.react_share === undefined ? (
          <PostReaction item={card.id} toggleCommentAdd={toggleCommentAdd} />
        ) : (
          <ToggleReaction
            item={card.id}
            liked={hasReacted.react_heart}
            shared={hasReacted.react_share}
            toggleCommentAdd={toggleCommentAdd}
          />
        )}
      </JtoSection>
      <JtoSection className="jto-comments">
        <ul>
          {cardComments.map((comment, i) => {
            return (
              <li className="jto-comment" key={i}>
                {comment.user.admin ? <i className="fas fa-shield-alt" /> : null}
                {comment.user.user_name}
                <ul className="comment-items">
                  <li className="comment-item body">{comment.body}</li>
                  {comment.date_modified == undefined ? (
                    <li className="comment-item date">
                      <TimeStamp date={comment.date_created} />
                      &nbsp;ago
                    </li>
                  ) : (
                    <li className="comment-item date">
                      <TimeStamp date={comment.date_modified}></TimeStamp>&nbsp;ago (Edited)
                    </li>
                  )}
                  {user.admin || comment.user.user_name === user.user_name ? (
                    <nav className="jto-dot-menu">
                      <input type="checkbox" id={`comment-toggle-${i}`} className="comment-toggle" value="selected" />
                      <label className={`comment-menu-container`} htmlFor={`comment-toggle-${i}`}>
                        <i className="fas fa-ellipsis-h" />
                        <div className="dot-menu-option" onClick={() => openEdit(comment.id, comment.body)}>
                          <i className="fas fa-pencil-alt" />
                          &nbsp;Edit
                        </div>
                        <div className="dot-menu-option" onClick={() => openDelete(comment.id)}>
                          <i className="far fa-trash-alt" title="delete" />
                          &nbsp;Delete
                        </div>
                      </label>
                    </nav>
                  ) : null}
                </ul>
              </li>
            );
          })}
        </ul>
        <BottomModal
          item={cardCommentsId}
          isShowing={isShowingCommentAdd}
          hide={toggleCommentAdd}
          action="add-comment"
        />
        <BottomModal
          item={currentId}
          payload={currentBody}
          isShowing={isShowingCommentEdit}
          hide={toggleCommentEdit}
          action="edit-comment"
        />
        <BottomModal
          item={currentId}
          isShowing={isShowingCommentDelete}
          hide={toggleCommentDelete}
          action="delete-comment"
        />
      </JtoSection>
    </main>
  );
};

export default PublicCard;
