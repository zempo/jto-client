import React, { useContext } from "react";
import PrivateListCard from '../Utils/PrivateListCard'
import { JtoSection, MenuOption, AddBtn, PaginateCards, ProcessMsg, SkeletonLoader2 } from "../Utils/Utils";
import { CardsContext } from "../../contexts/CardsContext";
import "./css/Cards.css";

const PrivateCards = () => {
  const {
    value: { cards, cardsPerPg, paginate, currentPg, currentCards, lastPg, loading, error }
  } = useContext(CardsContext);

  return (
    <>
      <h2>
        Showing {currentCards.length} of Your {cards.length} Occasions
      </h2>
      {cards.length > cardsPerPg ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : null}
      <JtoSection className="jto-cards private-cards">
        {/* make empty card with question mark and big "start creating Occasions button" */}
        <SkeletonLoader2 loading={loading} />
        {currentCards.map((card, i) => {
          return (
            <div key={i}>
              < PrivateListCard card={card} />
            </div>
          );
        })}
        <div className="card-container2">
          <AddBtn />
        </div>
      </JtoSection>
      {cards.length > cardsPerPg ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : null}
      {lastPg}
    </>
  );
};

export default PrivateCards;
