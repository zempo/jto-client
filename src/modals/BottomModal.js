import React from "react";
import ReactDOM from "react-dom";
import AddCard from "../components/Forms/Card/AddCardForm";
import Demo from "../components/Forms/Card/Demo";
import Download from "../components/Forms/Download/Download";
import DeleteCard from "../components/Forms/Card/DeleteCard";
import DeleteUserCard from "../components/Forms/Card/DeleteUserCard";
import EditCard from "../components/Forms/Card/EditCard";
import EditPublicCard from "../components/Forms/Card/EditPublicCard";
import EditComment from "../components/Forms/Social/EditComment";
import MakePrivate from "../components/Forms/Card/MakePrivate";
import MakePublic from "../components/Forms/Card/MakePublic";
// import DeleteComment from '../components/Forms/DeleteComment'
import "./css/Modal.css";

const BottomModal = ({ item, payload, action, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal-Bottom">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner-bottom ${isShowing}`}>
          {action === "add-card" ? (
            <AddCard cancel={hide} />
          ) : action === "demo" ? (
            <Demo cancel={hide} />
          ) : action === "download-card" ? (
            <Download item={item} cancel={hide} />
          ) : action === "delete-card" ? (
            <DeleteCard item={item} cancel={hide} />
          ) : action === "delete-user-card" ? (
            <DeleteUserCard item={item} cancel={hide} />
          ) : action === "edit-user-card" ? (
            <EditCard item={item} cancel={hide} />
          ) : action === "edit-card" ? (
            <EditPublicCard item={item} cancel={hide} />
          ) : action === "edit-comment" ? (
            <EditComment item={item} payload={payload} cancel={hide} />
          ) : action === "make-private" ? (
            <MakePrivate item={item} cancel={hide} />
          ) : action === "make-public" ? (
            <MakePublic item={item} cancel={hide} />
          ) : (
            "other modal"
          )}
        </div>
      </div>,
      document.querySelector("#bottom-modal")
    );
  } else {
    return null;
  }
};

export default BottomModal;
