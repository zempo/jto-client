import React, { useContext } from "react";
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
            <div key={i} className="jto-card list-card">
              <input type="checkbox" id={`card-toggle-${i}`} className="card-toggle" value="selected" />
              <label className="card-container" htmlFor={`card-toggle-${i}`}>
                <span className="checkmark" />
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
                  <MenuOption to="/private-card" text={<i className="far fa-eye" title="view" />} item_id={card.id} />
                  <MenuOption to="/edit" text={<i className="fas fa-pencil-alt" title="edit" />} item_id={card.id} />
                  <MenuOption to="/delete" text={<i className="far fa-trash-alt" title="delete" />} item_id={card.id} />
                  <MenuOption
                    to="/download"
                    text={<i className="fas fa-file-download" title="download" />}
                    item_id={card.id}
                  />
                  <MenuOption
                    to="/make-public"
                    text={<i className="fas fa-user-friends" title="publish" />}
                    item_id={card.id}
                  />
                </nav>
              </label>
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
