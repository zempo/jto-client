import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";
import { UserContext } from "../../contexts/UserContext";
import SearchGallery from "../Forms/SearchGallery";
import { JtoSection, MenuOption, PaginateCards, ProcessMsg, SkeletonLoader } from "../Utils/Utils";
import "./css/Gallery.css";

const Gallery = () => {
  const {
    value: {
      cards,
      cardsPerPg,
      paginate,
      currentPg,
      currentCards,
      lastPg,
      cardsReacts,
      getHeartsForCard,
      getSharesForCard,
      loading,
      error
    }
  } = useContext(GalleryContext);
  const { value: userValue } = useContext(UserContext);

  return (
    <>
      <SearchGallery />
      <p>
        Showing {currentCards.length} of {cards.length} Occasions
      </p>
      {cards.length > cardsPerPg ? (
        <PaginateCards currentCards={currentCards} paginate={paginate} currentPg={currentPg} lastPg={lastPg} />
      ) : null}
      <JtoSection className="jto-cards public-cards">
        <SkeletonLoader loading={loading} />
        {currentCards.map((card, i) => {
          return (
            <div key={i} className="jto-card list-card">
              <input type="checkbox" id={`card-toggle-${i}`} className="card-toggle" value="selected" />
              <label className="card-container" htmlFor={`card-toggle-${i}`}>
                <span className="checkmark2" />
                <div className="front face">
                  <p>{ProcessMsg(card.front_message, 30)}</p>
                  {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
                </div>
                <div className="inner-left face">
                  <p>{ProcessMsg(card.inside_message, 100)}</p>
                </div>
                <div className="inner-right face">
                  {card.inside_image !== "" ? <img src={card.inside_image} alt="card interior background" /> : null}
                </div>
                <nav className="jto-mini-menu">
                  <MenuOption to="/gallery-card" text="Visit" item_id={card.id} />
                  {userValue.user.admin ? <MenuOption to="/delete" text="Delete" item_id={card.id} /> : null}
                  <MenuOption to="/download" text="Download" item_id={card.id} />
                  {card.user.user_name === userValue.user.user_name ? (
                    <MenuOption to="/toggle-privacy" text="Make-Private" item_id={card.id} />
                  ) : null}
                </nav>
                <div className="jto-counter">
                  <span className="fa-stack">
                    <i className="fas fa-heart">
                      <strong className="fa-stack-1x fa-stack-text fa-inverse">
                        {getHeartsForCard(cardsReacts, i)}
                      </strong>
                    </i>
                  </span>
                  <span className="fa-stack">
                    <i className="fas fa-comment-alt">
                      <strong className="fa-stack-1x fa-stack-text fa-inverse">{card.number_of_comments}</strong>
                    </i>
                  </span>
                  <span className="fa-stack">
                    <i className="fas fa-bookmark">
                      <strong className="fa-stack-1x fa-stack-text fa-inverse">
                        {getSharesForCard(cardsReacts, i)}
                      </strong>
                    </i>
                  </span>
                </div>
              </label>
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
