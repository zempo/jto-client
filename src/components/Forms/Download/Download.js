import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { newCard } from "../../../services/endpoints-service";
import { Required } from "../../Utils/Utils";
import { UserContext } from "../../../contexts/UserContext";

const Download = ({ item, payload, cancel }) => {
  const [copied, setCopied] = useState(false);

  const {
    value: { user }
  } = useContext(UserContext);

  const handleCopy = async (e) => {
    e.preventDefault();
    let { inside_message, inside_image, front_image, theme, front_message } = payload;
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

      setCopied(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="download-menu">
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <Link
        className="modal-btn action"
        to={{
          pathname: "/download-card",
          state: {
            item,
            payload
          }
        }}
      >
        Download
      </Link>{" "}
      <Link
        className="modal-btn action"
        to={{
          pathname: "/email-card",
          state: {
            item,
            payload
          }
        }}
      >
        Email
      </Link>{" "}
      {user.user_name !== payload.user.user_name ? (
        <button className="modal-btn action" onClick={handleCopy}>
          <Required met={copied} />
          {copied ? "Copied" : "Copy"}
        </button>
      ) : null}
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default Download;
