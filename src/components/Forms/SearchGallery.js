import React, { useContext, useRef } from "react";
import { useInput2 } from "../../hooks/input-hook2";
import { GalleryContext } from "../../contexts/GalleryContext";
import { listCards, listReactions } from "../../services/endpoints-service";
import { ThemesList } from "../Utils/Utils";

const SearchGallery = () => {
  const {
    value: {
      searchCards,
      mergeResults,
      arrangeByKeyword,
      arrangeBySelection,
      arrangeByTheme,
      setSearching,
      setSearchCards
    }
  } = useContext(GalleryContext);
  const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput2("");
  const { check: arranged, radio: arrange, bindBtn: bindArrange, resetChecked: resetArrange } = useInput2("");
  const { value: themeSort, bind: bindThemeSort, reset: resetThemeSort } = useInput2("");
  const themeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSearching(true);
    try {
      const resetCards = await listCards.get("/");
      const resetReactions = await listReactions.get("/");
      const mergedData = await mergeResults(resetCards.data, resetReactions.data);
      const sortedKeyword = await arrangeByKeyword(mergedData, keyword);
      const sortedTheme = await arrangeByTheme(sortedKeyword, themeSort);
      const sortedSelect = await arrangeBySelection(sortedTheme, arrange);

      setSearchCards(sortedSelect);
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
        <label htmlFor="new">
          <input type="radio" name="arrange" id="new" value="new" {...bindArrange} />
          Newest
        </label>
        <label>
          <input type="radio" name="arrange" id="hearts" value="hearts" {...bindArrange} />
          Likes
        </label>
        <label>
          <input type="radio" name="arrange" id="comments" value="comments" {...bindArrange} />
          Comments
        </label>
        <label>
          <input type="radio" name="arrange" id="shares" value="shares" {...bindArrange} />
          Downloads
        </label>
        <label>
          <input type="radio" name="arrange" id="old" value="old" {...bindArrange} />
          Oldest
        </label>
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
