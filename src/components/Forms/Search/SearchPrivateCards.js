import React, { useState, useContext, useRef } from "react";
import { CardsContext } from "../../../contexts/CardsContext";
import { useForm } from "../../../hooks/get-files";
import { listUserCards } from "../../../services/endpoints-service";
import { validationSpacer } from "../../../services/validation/auth-validation";
import { ThemesList } from "../../Utils/Utils";

const SearchPrivateCards = () => {
  const {
    value: { arrangeByKeyword, arrangeBySelection, arrangeByTheme, setSearching, setSearchCards }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSearching(true);
    try {
      const resetCards = await listUserCards.get("/");
      const sortedKeyword = await arrangeByKeyword(resetCards.data, values.keyword);
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
      <h1>Search Your Cards</h1>
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

export default SearchPrivateCards;
