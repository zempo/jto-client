import React, { useEffect, useState, useContext } from "react";
// import { CardContext, CardContextProvider } from "../../contexts/CardContext";
import { UserContext } from "../../contexts/UserContext";
import { listUserCards } from "../../services/endpoints-service";
// create back-button
import { JtoSection, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
import { ThemeStyles } from "../Utils/Store/Themes";
import "./css/Card.css";

const Private = (props) => {
  // eslint-disable-next-line
  const { value } = useContext(UserContext);
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
      const { item } = props.location.state;
      setCardId(item);
      setLoading(true);
      const cardFound = async () => {
        try {
          const cardResult = await listUserCards.get(`/${item}`);

          setLoading(false);
          setCard(cardResult.data[0]);
          setCardTheme(cardResult.data[0].theme);
          console.log(cardResult.data[0]);
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
        Created {" "}
        {<TimeStamp date={card.date_created} />} ago
      </h3>
      <JtoSection className="jto-card private-card" style={ThemeStyles[`${cardTheme}`].all}>
        {/* style={Object.assign({}, ThemeStyles[`${cardTheme}`].all, ThemeStyles[`${cardTheme}`].front) */}
        <CardPages card={card} themes={ThemeStyles} cardTheme={cardTheme} cardPg={cardPg} />
        <PaginateCardFaces currentPg={cardPg} setCurrentPg={setCardPg} />
      </JtoSection>
    </>
  );
};

export default Private;
