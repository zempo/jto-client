import React, { useContext } from "react";
import SearchPrivateCards from "../Forms/Search/SearchPrivateCards";
import PrivateListCard from "../Utils/Card/PrivateListCard";
import PrivateSearchCard from "../Utils/Card/PrivateSearchCard";
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
      // eslint-disable-next-line
      error
    }
  } = useContext(CardsContext);

  return (
    <>
      <SearchPrivateCards cards={cards} />
      <h2 className="animated-h2">Add Occasion?</h2>
      <AddBtn />
      {!searching ? (
        <JtoSection className="cards-counter">
          <h2>
            Showing {currentCards.length} of {cards.length} Occasions
          </h2>
        </JtoSection>
      ) : (
        <JtoSection className="cards-counter">
          <h2>
            Showing {currentSearchCards.length} of {searchCards.length} Results
          </h2>
        </JtoSection>
      )}
      <div className="top-pagination">
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
      </div>
      <JtoSection className="jto-cards private-cards">
        {/* make empty card with question mark and big "start creating Occasions button" */}
        <SkeletonLoader2 loading={loading} />
        {!searching
          ? currentCards.map((card, i) => {
              return (
                <div key={i}>
                  <PrivateListCard card={card} />
                </div>
              );
            })
          : currentSearchCards.map((card, i) => {
              return (
                <div key={i}>
                  <PrivateSearchCard card={card} />
                </div>
              );
            })}
      </JtoSection>
      <div className="bottom-pagination">
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
      </div>
    </>
  );
};

export default PrivateCards;
