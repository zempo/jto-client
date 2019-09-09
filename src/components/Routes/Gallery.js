import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";
import { UserContext } from "../../contexts/UserContext";
import { JtoSection, PaginateCards, SkeletonLoader } from "../Utils/Utils";
import ListCard from "../Utils/Card/ListCard";
import SearchCard from "../Utils/Card/SearchCard";
import SearchGallery from "../Forms/Search/SearchGallery";
import "./css/Gallery.css";

const Gallery = () => {
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
  } = useContext(GalleryContext);
  const { value: userValue } = useContext(UserContext);

  return (
    <>
      <SearchGallery cards={cards} />
      {!searching ? (
        <JtoSection className="cards-counter">
          <h3>
            Showing {currentCards.length} of {cards.length} Occasions
          </h3>
        </JtoSection>
      ) : (
        <JtoSection className="cards-counter">
          <h3>
            Showing {currentSearchCards.length} of {searchCards.length} Results
          </h3>
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
      <JtoSection className="jto-cards public-cards">
        <SkeletonLoader loading={loading} />
        {!searching
          ? currentCards.map((card, i) => {
              return (
                <div key={i}>
                  <ListCard card={card} admin={userValue.user.admin} user_name={userValue.user.user_name} />
                </div>
              );
            })
          : currentSearchCards.map((card, i) => {
              return (
                <div key={i}>
                  <SearchCard card={card} admin={userValue.user.admin} user_name={userValue.user.user_name} />
                </div>
              );
            })}
      </JtoSection>
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
    </>
  );
};

export default Gallery;
