import React, { useContext, useRef, useState } from "react";
import { useForm } from "../../../hooks/get-files";
import { GalleryContext } from "../../../contexts/GalleryContext";
import { listActions, listCards } from "../../../services/endpoints-service";
import { validationSpacer } from "../../../services/validation/auth-validation";
import { ThemesList } from "../../Utils/Utils";
import "./css/SearchForm.css";

const SearchGallery = () => {
  const {
    value: {
      mergeResults,
      arrangeByKeyword,
      arrangeBySelection,
      arrangeByTheme,
      setSearching,
      setSearchCards,
    },
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
  const buttonRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSearching(true);
    try {
      const resetCards = await listCards.get("/");
      const resetActions = await listActions.get("/");
      const mergedData = await mergeResults(
        resetCards.data.payload,
        resetActions.data.payload
      );
      const sortedKeyword = await arrangeByKeyword(mergedData, values.keyword);
      const sortedTheme = await arrangeByTheme(sortedKeyword, values.themeSort);
      const sortedSelect = await arrangeBySelection(sortedTheme, arrange);

      setSearchCards(sortedSelect);

      let posY = buttonRef.current.offsetTop;
      let uA = navigator.userAgent;
      if (
        uA.toLowerCase().includes("compatible") ||
        uA.toLowerCase().includes("edge") ||
        uA.includes("MSIE") ||
        uA.includes("Trident/")
      ) {
      }

      if (
        !uA.toLowerCase().includes("chrome") &&
        !uA.toLowerCase().includes("gecko/")
      ) {
        window.scrollTo(0, posY);
      }

      window.scrollTo({
        top: posY,
        left: 0,
        behavior: "smooth",
      });

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='jto-form search-form' onSubmit={handleSubmit}>
      <h2 className='animated-h2'>Explore the Gallery</h2>
      <div className='search-fields'>
        <fieldset className='search-term'>
          <legend>Term</legend>
          <input
            type='text'
            className='keyword'
            placeholder='International Lefthanders Day'
            name='keyword'
            id={1}
            value={values.keyword}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className='theme-select'>
          <legend>Font</legend>
          <select
            ref={themeRef}
            className='themes'
            name='themeSort'
            id={2}
            value={values.themeSort}
            onChange={handleChange}
          >
            <option value='Any'>Any</option>
            <ThemesList />
          </select>
        </fieldset>
        <fieldset className='sort-by'>
          <legend>Category</legend>
          <div className='sort-fields'>
            <label htmlFor='new'>
              New <br />
              <input
                type='radio'
                name='new'
                value='new'
                checked={arrange === "new"}
                onChange={handleRadio}
              />
            </label>
            <label>
              Likes <br />
              <input
                type='radio'
                name='hearts'
                value='hearts'
                checked={arrange === "hearts"}
                onChange={handleRadio}
              />
            </label>
            <label>
              Comments <br />
              <input
                type='radio'
                name='comments'
                value='comments'
                checked={arrange === "comments"}
                onChange={handleRadio}
              />
            </label>
            <label>
              Shares <br />
              <input
                type='radio'
                name='shares'
                value='shares'
                checked={arrange === "shares"}
                onChange={handleRadio}
              />
            </label>
            <label>
              Old <br />
              <input
                type='radio'
                name='old'
                value='old'
                checked={arrange === "old"}
                onChange={handleRadio}
              />
            </label>
          </div>
        </fieldset>
      </div>
      <button ref={buttonRef} className='browse-btn action'>
        Browse
      </button>
    </form>
  );
};

export default SearchGallery;
