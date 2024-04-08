import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import style from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term", { duration: 2000 });
      return;
    }
    onSearch(searchQuery);
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <header className={style.headerWrap}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <FaSearch className={style.searchIcon} onClick={handleIconClick} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            ref={inputRef}
            className={style.input}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{ display: "none" }}
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
