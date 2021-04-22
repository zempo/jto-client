import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { CardContext } from "../../contexts/CardContext";
import { listUserCards } from "../../services/endpoints-service";
// create back-button
import {
  JtoSection,
  TimeStamp,
  CardPages,
  PaginateCardFaces,
  BackBtn,
} from "../Utils/Utils";
import { ThemeStyles } from "../Utils/Store/Themes";
import "./css/Card.css";

const Private = (props) => {
  // eslint-disable-next-line
  const { value } = useContext(UserContext);
  const {
    value: { setAnyCardId },
  } = useContext(CardContext);
  // eslint-disable-next-line
  const [cardId, setCardId] = useState(0);
  const [card, setCard] = useState({});
  const [cardTheme, setCardTheme] = useState("handwritten");
  const [cardPg, setCardPg] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.location.state !== undefined) {
      window.scrollTo(0, 0);
      const { item } = props.location.state;
      setCardId(item);
      setAnyCardId(item);
      setLoading(true);
      const cardFound = async () => {
        try {
          const cardResult = await listUserCards.get(`/${item}`);
          setLoading(false);
          setCard(cardResult.data.payload[0]);
          setCardTheme(cardResult.data.payload[0].theme);
        } catch (err) {
          if (err.response.status === 401) {
            setLoading(false);
            setError(true);
          }
        }
      };

      cardFound();
    }
    setAnyCardId(1);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='card-page'>
      <BackBtn history={props.history}></BackBtn>
      {/* eslint-disable-next-line */}
      {card.date_modified == undefined ? (
        <h2 className='animated-h2'>
          Created by <span className='username'>You</span>{" "}
          {<TimeStamp date={card.date_created} />} ago
        </h2>
      ) : (
        <h2 className='animated-h2'>
          Created by <span className='username'>You</span>{" "}
          {<TimeStamp date={card.date_created} />} ago. <br /> (Edited{" "}
          {<TimeStamp date={card.date_modified} />} ago).
        </h2>
      )}
      <JtoSection
        className='jto-card private-card'
        style={ThemeStyles[`${cardTheme}`].all}
      >
        {/* style={Object.assign({}, ThemeStyles[`${cardTheme}`].all, ThemeStyles[`${cardTheme}`].front) */}
        <PaginateCardFaces currentPg={cardPg} setCurrentPg={setCardPg} />
        <CardPages
          card={card}
          themes={ThemeStyles}
          cardTheme={cardTheme}
          cardPg={cardPg}
        />
      </JtoSection>
    </div>
  );
};

export default Private;
