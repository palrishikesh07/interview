import React from "react";

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const Search = ({ handleSearch }) => {
  const searchingText = (e) => {
    handleSearch(e.target.value);
  };

  const searchDebounce = debounce(searchingText, 1000);

  return (
    <div>
      <input type="text" onChange={searchDebounce} placeholder="Enter Text" />
    </div>
  );
};

export default Search;
