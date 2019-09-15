import React, { useContext, useRef, useState } from "react";
import { useForm } from "../../../hooks/get-files";
import { GalleryContext } from "../../../contexts/GalleryContext";
import { listCards, listReactions } from "../../../services/endpoints-service";
import { validationSpacer } from "../../../services/validation/auth-validation";
import { ThemesList } from "../../Utils/Utils";

const SearchGallery = () => {
  const {
    value: { mergeResults, arrangeByKeyword, arrangeBySelection, arrangeByTheme, setSearching, setSearchCards }
  } = useContext(GalleryContext);

  const { values, handleChange, reset } = useForm(
    { keyword: "", themeSort: "" },
    { 1: [], 2: [] },
    {},
    { 1: validationSpacer, 2: validationSpacer }
  );
  const [arrange, setArrange] = useState("");
  const handleRadio = (e) => setArrange(e.target.name);

  const themeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSearching(true);
    try {
      const resetCards = await listCards.get("/");
      const resetReactions = await listReactions.get("/");
      const mergedData = await mergeResults(resetCards.data, resetReactions.data);
      const sortedKeyword = await arrangeByKeyword(mergedData, values.keyword);
      const sortedTheme = await arrangeByTheme(sortedKeyword, values.themeSort);
      const sortedSelect = await arrangeBySelection(sortedTheme, arrange);

      setSearchCards(sortedSelect);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="jto-form search-form" onSubmit={handleSubmit}>
      <h2 className="animated-h2">Explore the Gallery.</h2>
      <fieldset className="searchTerm">
        <input
          type="text"
          className="keyword"
          placeholder="International Lefthanders Day"
          name="keyword"
          id={1}
          value={values.keyword}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="sortBy">
        <label htmlFor="new">
          <input type="radio" name="new" value="new" checked={arrange === "new"} onChange={handleRadio} />
          Newest
        </label>
        <label>
          <input type="radio" name="hearts" value="hearts" checked={arrange === "hearts"} onChange={handleRadio} />
          Likes
        </label>
        <label>
          <input
            type="radio"
            name="comments"
            value="comments"
            checked={arrange === "comments"}
            onChange={handleRadio}
          />
          Comments
        </label>
        <label>
          <input type="radio" name="shares" value="shares" checked={arrange === "shares"} onChange={handleRadio} />
          Downloads
        </label>
        <label>
          <input type="radio" name="old" value="old" checked={arrange === "old"} onChange={handleRadio} />
          Oldest
        </label>
      </fieldset>
      <fieldset className="themeSelect">
        <select
          ref={themeRef}
          className="themes"
          name="themeSort"
          id={2}
          value={values.themeSort}
          onChange={handleChange}
        >
          <option value="Any">Any</option>
          <ThemesList />
        </select>
      </fieldset>
      <button>Browse Occasions</button>
    </form>
  );
};

export default SearchGallery;
