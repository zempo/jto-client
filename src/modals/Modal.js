import React from "react";
import ReactDOM from "react-dom";
import AddCard from "../components/Forms/Card/AddCardForm";
import DeleteCard from "../components/Forms/Card/DeleteCard";
import DeleteUserCard from "../components/Forms/Card/DeleteUserCard";
import EditCard from "../components/Forms/Card/EditCard";
import EditPublicCard from "../components/Forms/Card/EditPublicCard";
import MakePrivate from "../components/Forms/Card/MakePrivate";
import MakePublic from "../components/Forms/Card/MakePublic";
// import DeleteComment from '../components/Forms/DeleteComment'
// import EditComment from '../components/Forms/EditComment'
import "./css/Modal.css";

const Modal = ({ item, action, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal">
        <div onClick={(e) => e.stopPropagation()} className="Modal__inner">
          {action === "add-card" ? (
            <AddCard cancel={hide} />
          ) : action === "delete-card" ? (
            <DeleteCard item={item} cancel={hide} />
          ) : action === "delete-user-card" ? (
            <DeleteUserCard item={item} cancel={hide} />
          ) : action === "edit-user-card" ? (
            <EditCard item={item} cancel={hide} />
          ) : action === "edit-card" ? (
            <EditPublicCard item={item} cancel={hide} />
          ) : action === "make-private" ? (
            <MakePrivate item={item} cancel={hide} />
          ) : action === "make-public" ? (
            <MakePublic item={item} cancel={hide} />
          ) : (
            "other modal"
          )}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};

export default Modal;
