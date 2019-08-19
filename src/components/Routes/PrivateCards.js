import React, { useContext } from "react";
import PrivateListCard from '../Utils/PrivateListCard'
import PrivateSearchCard from '../Utils/PrivateSearchCard'
import { JtoSection, AddBtn, PaginateCards, SkeletonLoader2 } from "../Utils/Utils";
import { CardsContext } from "../../contexts/CardsContext";
import "./css/Cards.css";

const PrivateCards = () => {
  const {
    value: {
      cards,
      searchCards,
      cardsPerPg,
      searchCardsPerPg,
      paginate,
      paginateSearch,
      currentPg,
      currentSearchPg,
      currentCards,
      currentSearchCards,
      lastPg,
      lastSearchPg,
      searching,
      loading,
      error
    }
  } = useContext(CardsContext);

  return (
    <>
      {!searching ? (
        <JtoSection className="cards-counter">
          <p>
            Showing {currentCards.length} of {cards.length} Occasions
          </p>
        </JtoSection>
      ) : (
          <JtoSection className="cards-counter">
            <p>
              Showing {currentSearchCards.length} of {searchCards.length} Results
          </p>
          </JtoSection>
        )}
      {cards.length > cardsPerPg && !searching ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : searchCards.length > searchCardsPerPg && searching ? (
        <PaginateCards
          currentCards={currentSearchCards}
          paginate={paginateSearch}
          currentPg={currentSearchPg}
          lastPg={lastSearchPg}
        />
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
