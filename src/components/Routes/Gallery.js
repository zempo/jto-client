import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";
import { UserContext } from "../../contexts/UserContext";
import SearchGallery from "../Forms/SearchGallery";
import { JtoSection, MenuOption } from "../Utils/Utils";
import TextPlaceholder from "../../images/writing-placeholder.jpg";
import "./css/Gallery.css";

const Gallery = () => {
  const { value } = useContext(GalleryContext);
  const { value: userValue } = useContext(UserContext);

  return (
    <>
      <SearchGallery />
      <p>Showing Occasions {value.cards.length}</p>
      <JtoSection className="jto-cards public-cards">
        {value.cards.map((card, i) => {
          return (
            <div key={i} className="jto-card list-card">
              <input type="checkbox" id={`card-toggle-${i}`} className="card-toggle" value="selected" />
              <label className="card-container" htmlFor={`card-toggle-${i}`}>
                <span className="checkmark2" />
                <div className="front face">
                  <p>{card.front_message}</p>
                  {card.front_image !== "" ? <img src={card.front_image} alt="front background" /> : null}
                </div>
                <div className="inner-left face">
                  <img src={TextPlaceholder} alt="front background" />
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
                        {value.getHeartsForCard(value.cardsReacts, i)}
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
                        {value.getSharesForCard(value.cardsReacts, i)}
                      </strong>
                    </i>
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </JtoSection>
    </>
  );
};

export default Gallery;
