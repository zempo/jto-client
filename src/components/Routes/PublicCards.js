import React, { useContext } from "react";
import GalleryContext from "../../contexts/GalleryContext";

const PublicCards = () => {
  const { cards } = useContext(GalleryContext);
  return (
    <section className="jto-public-cards">
      <h2>Occasions Gallery</h2>
      <p>Showing Occasions ${cards.length}</p>
    </section>
  );
};

export default PublicCards;
