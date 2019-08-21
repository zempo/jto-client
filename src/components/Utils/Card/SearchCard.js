import React from "react";
import { useModal } from "../../../hooks/use-modal";
import Modal from "../../../modals/Modal";
import { MenuOption, ProcessMsg } from "../Utils";

const SearchCard = ({ card, admin, user_name }) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useModal();
  const { isShowing: isShowingPrivate, toggle: togglePrivate } = useModal();

  return (
    <div className="jto-card list-card">
      <input type="checkbox" id={`card-toggle-${card.id}`} className="card-toggle" value="selected" />
      <label className="card-container" htmlFor={`card-toggle-${card.id}`}>
        <span className="checkmark2" />
        <div className="front face">
          {/* {card.id} */}
          <p>{ProcessMsg(card.front_message, 30)}</p>
          {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
        </div>
        <div className="inner-left face">
          <p>{ProcessMsg(card.inside_message, 100)}</p>
        </div>
        <div className="inner-right face">
          {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
        </div>
        <nav className="jto-mini-menu">
          <MenuOption to="/gallery-card" text={<i className="far fa-eye" title="view" />} item_id={card.id} />
          {card.user.user_name === user_name ? (
            <div className="menu-option toggle-modal">
              <i className="fas fa-pencil-alt" title="edit" onClick={toggleEdit} />
            </div>
          ) : null}
          <Modal isShowing={isShowingEdit} hide={toggleEdit} item={card.id} action="edit-card" />
          <Modal isShowing={isShowingPrivate} hide={togglePrivate} item={card.id} action="make-private" />
          {admin ? (
            <div className="menu-option toggle-modal">
              <i className="far fa-trash-alt" title="delete" onClick={toggleDelete} />
            </div>
          ) : null}
          <Modal isShowing={isShowingDelete} hide={toggleDelete} item={card.id} action="delete-card" />
          <MenuOption to="/download" text={<i className="fas fa-file-download" title="download" />} item_id={card.id} />
          {card.user.user_name === user_name ? (
            <div className="menu-option toggle-modal">
              <i className="fas fa-user-lock" title="make private" onClick={togglePrivate} />
            </div>
          ) : null}
          <Modal isShowing={isShowingPrivate} hide={togglePrivate} item={card.id} action="make-private" />
        </nav>
        <div className="jto-counter">
          <span className="fa-stack">
            <i className="fas fa-heart">
              <strong className="fa-stack-1x fa-stack-text fa-inverse">{card.number_of_hearts}</strong>
            </i>
          </span>
          <span className="fa-stack">
            <i className="fas fa-comment-alt">
              <strong className="fa-stack-1x fa-stack-text fa-inverse">{card.number_of_comments}</strong>
            </i>
          </span>
          <span className="fa-stack">
            <i className="fas fa-bookmark">
              <strong className="fa-stack-1x fa-stack-text fa-inverse">{card.number_of_shares}</strong>
            </i>
          </span>
        </div>
      </label>
    </div>
  );
};

export default SearchCard;
