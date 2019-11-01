import React, { useState, useContext, useRef } from "react";
import { CardsContext } from "../../../contexts/CardsContext";
import { useForm } from "../../../hooks/get-files";
import { listUserCards } from "../../../services/endpoints-service";
import { validationSpacer } from "../../../services/validation/auth-validation";
import { ThemesList } from "../../Utils/Utils";

const SearchPrivateCards = () => {
  const {
    // eslint-disable-next-line
    value: { cards, searchCards, arrangeByKeyword, arrangeBySelection, arrangeByTheme, setSearching, setSearchCards }
  } = useContext(CardsContext);
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
      const resetCards = await listUserCards.get("/");
      const sortedKeyword = await arrangeByKeyword(resetCards.data, values.keyword);
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

      if (!uA.toLowerCase().includes("chrome") && !uA.toLowerCase().includes("gecko/")) {
        window.scrollTo(0, posY);
      }

      window.scrollTo({
        top: posY,
        left: 0,
        behavior: "smooth"
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="jto-form search-form" onSubmit={handleSubmit}>
      {cards.length === 0 ? (
        <h2 className="animated-h2">Create Your First Occasion</h2>
      ) : (
        <h2 className="animated-h2">Explore Your Occasions</h2>
      )}
      <div className="search-fields">
        <fieldset className="user-search-term">
          <legend>Term</legend>
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
        <fieldset className="user-theme-select">
          <legend>Font</legend>
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
        <fieldset className="user-sort-by">
          <legend>Category</legend>
          <div className="sort-fields">
            <label htmlFor="new">
              New <br />
              <input type="radio" name="new" value="new" checked={arrange === "new"} onChange={handleRadio} />
            </label>
            <label>
              Old <br />
              <input type="radio" name="old" value="old" checked={arrange === "old"} onChange={handleRadio} />
            </label>
          </div>
        </fieldset>
      </div>
      <button ref={buttonRef} className="browse-btn action">
        Browse
      </button>
    </form>
  );
};

export default SearchPrivateCards;
