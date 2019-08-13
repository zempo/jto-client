import React, { useContext, useRef } from "react";
import { useInput2 } from "../../hooks/input-hook2";
import { GalleryContext } from "../../contexts/GalleryContext";
import { ThemesList } from "../Utils/Utils";

const SearchGallery = () => {
  const {
    value: { cards, arrangeByKeyword }
  } = useContext(GalleryContext);
  const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput2("");
  const { checked: arrange, bindBtn: bindArrange, resetChecked: resetArrange } = useInput2("");
  const { value: themeSort, bind: bindThemeSort, reset: resetThemeSort } = useInput2("");
  const themeRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    arrangeByKeyword(cards, keyword);
    console.log(keyword, arrange, themeSort);
    // console.log(arrangeByKeyword(cards));
    resetKeyword();
    resetArrange();
    resetThemeSort();
  };

  return (
    <form className="jto-form search-form" onSubmit={handleSubmit}>
      <h1>Explore Our Gallery</h1>
      <fieldset>
        <input type="text" className="keyword" placeholder="International Lefthanders Day" {...bindKeyword} />
      </fieldset>
      <fieldset>
        <input type="radio" name="arrange" id="date" value="date" {...bindArrange} />
        Date
        <input type="radio" name="arrange" id="popularity" value="popularity" {...bindArrange} />
        Popularity
        <input type="radio" name="arrange" id="user" value="user" {...bindArrange} />
        User
      </fieldset>
      <fieldset>
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
