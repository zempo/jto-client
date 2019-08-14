import React, { useContext, useRef } from "react";
import { useInput2 } from "../../hooks/input-hook2";
import { GalleryContext } from "../../contexts/GalleryContext";
import { listCards, listReactions } from "../../services/endpoints-service";
import { ThemesList } from "../Utils/Utils";

const SearchGallery = () => {
  const {
    value: {
      arrangeByKeyword,
      arrangeBySelection,
      arrangeByTheme,
      setCurrentPg,
      setCardsPerPg,
      searching,
      setSearching
    }
  } = useContext(GalleryContext);
  const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput2("");
  const { radio: arrange, bindBtn: bindArrange, resetChecked: resetArrange } = useInput2("");
  const { value: themeSort, bind: bindThemeSort, reset: resetThemeSort } = useInput2("");
  const themeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCurrentPg(1);
    setSearching(true);
    try {
      const resetCards = await listCards.get("/");
      setCardsPerPg(resetCards.data.length);
      const resetReactions = await listReactions.get("/");

      const sortedKeyword = await arrangeByKeyword(resetCards.data, keyword);
      const sortedTheme = await arrangeByTheme(sortedKeyword, themeSort);

      arrangeBySelection(sortedTheme, resetReactions.data, arrange);

      resetKeyword();
      resetArrange();
      resetThemeSort();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="jto-form search-form" onSubmit={handleSubmit}>
      <h1>Explore Our Gallery</h1>
      <fieldset className="searchTerm">
        <input type="text" className="keyword" placeholder="International Lefthanders Day" {...bindKeyword} />
      </fieldset>
      <fieldset className="sortBy">
        <input type="radio" name="arrange" id="recent" value="recent" {...bindArrange} />
        Recent
        <input type="radio" name="arrange" id="popular" value="popular" {...bindArrange} />
        Popular
        <input type="radio" name="arrange" id="ancient" value="ancient" {...bindArrange} />
        Ancient
      </fieldset>
      <fieldset className="themeSelect">
        <select ref={themeRef} className="themes" name="theme" id="theme" {...bindThemeSort}>
          <option value="Any">Any</option>
          <ThemesList />
        </select>
      </fieldset>
      <button>Browse Occasions</button>
    </form>
  );
};

export default SearchGallery;
