import React, { useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";

const PublicCards = () => {
  const { value } = useContext(GalleryContext);
  console.log(value);
  return (
    <section className="jto-public-cards">
      <h2>Occasions Gallery</h2>
      <p>Showing Occasions {value.cards.length}</p>
    </section>
  );
};

export default PublicCards;
