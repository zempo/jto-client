import React from "react";
import Modal from "../../../modals/Modal";
import { useModal } from "../../../hooks/use-modal";
import { MenuOption, ProcessMsg } from "../Utils";

const PrivateListCard = ({ card }) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useModal();
  const { isShowing: isShowingPublic, toggle: togglePublic } = useModal();

  return (
    <div className="jto-card list-card">
      <input type="checkbox" id={`card-toggle-${card.id}`} className="card-toggle" value="selected" />
      <label className="card-container" htmlFor={`card-toggle-${card.id}`}>
        <span className="checkmark" />
        <div className="front face">
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
          <MenuOption to="/private-card" text={<i className="far fa-eye" title="view" />} item_id={card.id} />
          <div className="menu-option toggle-modal">
            <i className="fas fa-pencil-alt" title="edit" onClick={toggleEdit} />
          </div>
          <Modal isShowing={isShowingEdit} hide={toggleEdit} item={card.id} action="edit-user-card" />
          <div className="menu-option toggle-modal">
            <i className="far fa-trash-alt" title="delete" onClick={toggleDelete} />
          </div>
          <Modal isShowing={isShowingDelete} hide={toggleDelete} item={card.id} action="delete-user-card" />
          <MenuOption to="/download" text={<i className="fas fa-file-download" title="download" />} item_id={card.id} />
          <div className="menu-option toggle-modal">
            <i className="fas fa-user-friends" title="publish" onClick={togglePublic} />
          </div>
          <Modal isShowing={isShowingPublic} hide={togglePublic} item={card.id} action="make-public" />
        </nav>
      </label>
    </div>
  );
};

export default PrivateListCard;
