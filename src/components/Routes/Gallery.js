import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="animated-h1">Gallery</h1>
      <SearchGallery cards={cards} />
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

export default Gallery;
