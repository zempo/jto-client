import React from "react";
import { MenuOption, ProcessMsg } from "./Utils";

const PrivateListCard = ({ card }) => {
    return (
        <div className="jto-card list-card">
            <input type="checkbox" id={`card-toggle-${card.id}`} className="card-toggle" value="selected" />
            <label className="card-container" htmlFor={`card-toggle-${card.id}`}>
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
};

export default PrivateListCard;
