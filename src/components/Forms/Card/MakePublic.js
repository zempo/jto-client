import React, { useState, useContext, useLayoutEffect, useRef } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { makePublic, listUserCards, listCards } from "../../../services/endpoints-service";
import { CardsContext } from "../../../contexts/CardsContext";
import { GalleryContext } from "../../../contexts/GalleryContext";

const MakePublic = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const unmounted = useRef(false);
  const {
    value: { moveOrDeleteCard }
  } = useContext(CardsContext);
  const {
    value: { addToPublicCards }
  } = useContext(GalleryContext);

  useLayoutEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
      // console.clear();
      setTimeout(() => {
        // console.clear();
      }, 1100);
    };
  }, []);

  const handlePrivacy = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      let cardToMove = await listUserCards.get(`/${item}`);
      let updatedCard = cardToMove.data[0];
      updatedCard.public = true;
      console.log(updatedCard);
      let moved = await makePublic.patch(`/${item}`);
      let newPrivateCards = await listUserCards.get("");
      let updatedCards = await moveOrDeleteCard(newPrivateCards.data, newPrivateCards.data);
      let newPublicCards = await listCards.get("");
      // let updatedPublicCards = await addToPublicCards(newPublicCards.data, newPublicCards.data, updatedCard);

      setResStatus(moved.status);
      setResMsg("Occasion Sent to Gallery");
      setTimeout(() => {
        setResStatus(0);
        cancel();
        unmounted.current = true;
      }, 1000);
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className="jto-privacy">
      <h2>Are you ready to Publish your Occasion?</h2>
      <p>
        Once your publish your occasion, other users will be able see it. <br />
        However, you can remove your occasion from the gallery anytime you wish!
      </p>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <button className="modal-btn" onClick={handlePrivacy}>
        Make Occasion Public
      </button>
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default MakePublic;
