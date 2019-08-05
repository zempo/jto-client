import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";
import { JtoSection } from "../Utils/Utils";

const PublicCards = () => {
  const { value } = useContext(GalleryContext);

  // create a search form
  // "showing 5 of 60 occasions"
  // run array methods on all queried results
  // using context array methods from context

  console.log(value.cards);
  return (
    <JtoSection className="jto-public-cards">
      <h2>Occasions Gallery</h2>
      <p>Showing Occasions {value.cards.length}</p>
    </JtoSection>
  );
};

export default PublicCards;
