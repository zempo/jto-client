import React, { useContext, useRef } from "react";
import { useForm } from '../../hooks/get-files'
import {useRadio} from '../../hooks/get-radio'
import { GalleryContext } from "../../contexts/GalleryContext";
import { listCards, listReactions } from "../../services/endpoints-service";
import { validationSpacer } from '../../services/validation/auth-validation'
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

  const { values, handleChange, reset } = useForm(
    { keyword: "", themeSort: "" },
    { 1: [], 2: [] },
    {},
    { 1: validationSpacer, 2: validationSpacer }
  );

  // const {values: radioValues, handleChange, reset} = useRadio({})

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
      const sortedSelect = await arrangeBySelection(sortedTheme, values.arrange);

      setSearchCards(sortedSelect);
      reset()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="jto-form search-form" onSubmit={handleSubmit}>
      <h1>Explore Our Gallery</h1>
      <fieldset className="searchTerm">
        <input type="text" className="keyword" placeholder="International Lefthanders Day" name="keyword" id={1} value={values.keyword} onChange={handleChange} />
      </fieldset>
      <fieldset className="sortBy">
        <label htmlFor="new">
          <input type="radio" name="new"  value="new" onClick={e => console.log(e.target)}/>
          Newest
        </label>
        <label>
          <input type="radio" name="hearts" value="heart" />
          Likes
        </label>
        <label>
          <input type="radio" name="comments" value="comments" />
          Comments
        </label>
        <label>
          <input type="radio" name="shares" value="shares" />
          Downloads
        </label>
        <label>
          <input type="radio" name="old" value="old" />
          Oldest
        </label>
      </fieldset>
      <fieldset className="themeSelect">
        <select ref={themeRef} className="themes" name="themeSort" id={2} value={values.themeSort} onChange={handleChange}>
          <option value="Any">Any</option>
          <ThemesList />
        </select>
      </fieldset>
      {values.arrange} 
      <button>Browse Occasions</button>
    </form>
  );
};

export default SearchGallery;
