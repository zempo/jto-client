import React, { useState, useContext, useLayoutEffect, useRef } from "react";
import { JtoNotification } from "../../Utils/Utils";
import { deleteUserCard, listUserCards } from "../../../services/endpoints-service";
import { CardsContext } from "../../../contexts/CardsContext";

const DeleteUserCard = ({ item, cancel }) => {
  // eslint-disable-next-line
  const [displaying, setDisplaying] = useState(true);
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const unmounted = useRef(false);
  const {
    value: { moveOrDeleteCard }
  } = useContext(CardsContext);

  useLayoutEffect(() => {
    // unmounted.current = false;
    return () => {
      // unmounted.current = true;
      // // console.clear();
      // setTimeout(() => {
      //   console.clear();
      //   console.log("dismount");
      //   unmounted.current = true;
      // }, 1000);
    };
  }, []);

  const handleDelete = async (e) => {
    setResStatus(0);
    setResMsg("");
    try {
      let deleted = await deleteUserCard.delete(`/${item}`);
      let newCards = await listUserCards.get("");
      let updatedCards = await moveOrDeleteCard(newCards.data, newCards.data);

      // return array of all cards at present
      // set a variable equal to all cards minus the id of current
      // delete
      setResStatus(204);
      setResMsg("Occasion Deleted");
      cancel();
      setTimeout(() => {
        // setResStatus(0);
        // unmounted.current = true;
      }, 1000);
      // window.location.reload();
    } catch (err) {
      setError(true);
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.error));
    }
  };

  return (
    <div className={resStatus === 0 || resStatus === 204 ? null : "shake"}>
      <h2>Are you sure you want to delete your occasion?</h2>
      <p>Once you delete an Occasion, this action cannot be undone.</p>
      {/* {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />} */}
      <button onClick={handleDelete}>Yes</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
      <button onClick={cancel}>No</button>
    </div>
  );
};

export default DeleteUserCard;
