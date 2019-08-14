import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";
import { UserContext } from "../../contexts/UserContext";
import SearchGallery from "../Forms/SearchGallery";
import { JtoSection, MenuOption, PaginateCards, ProcessMsg, SkeletonLoader } from "../Utils/Utils";
import ListCard from '../Utils/ListCard'
import SearchCard from '../Utils/SearchCard'
import "./css/Gallery.css";

const Gallery = () => {
  const {
    value: {
      cards,
      searchCards,
      cardsPerPg,
      paginate,
      currentPg,
      currentCards,
      lastPg,
      cardsReacts,
      getHeartsForCard,
      getSharesForCard,
      searching,
      loading,
      error
    }
  } = useContext(GalleryContext);
  const { value: userValue } = useContext(UserContext);

  return (
    <>
      <SearchGallery cards={cards} />
      {!searching ? (
        <JtoSection className="cards-counter">
          <p>
            Showing {currentCards.length} of {cards.length} Occasions
          </p>
        </JtoSection>
      ) : (
        <JtoSection className="cards-counter">
        <p>Found {searchCards.length} results</p>
        </JtoSection>
      )}
      {cards.length > cardsPerPg ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : null}
      <JtoSection className="jto-cards public-cards">
        <SkeletonLoader loading={loading} />
        {!searching
          ? currentCards.map((card, i) => {
              return (
                <div key={i}>
              < ListCard
                  card={card}
                  admin={userValue.user.admin}
                  user_name={userValue.user.user_name}
                  cardsReacts={cardsReacts}
                  getHeartsForCard={getHeartsForCard}
                  getSharesForCard={getSharesForCard}
                  />
                  </div>
                )
          }): searchCards.map((card, i) => {
              return (
                <div key={i}>
                < SearchCard
                card={card}
                index={i}
                admin={userValue.user.admin}
                user_name={userValue.user.user_name}
                cardsReacts={cardsReacts}
                getHeartsForCard={getHeartsForCard}
                getSharesForCard={getSharesForCard}
                />
                </div>
              );
            })}
      </JtoSection>
      {cards.length > cardsPerPg ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : null}
    </>
  );
};

export default Gallery;
