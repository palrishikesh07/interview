import React from "react";

const Search = ({ onSearch, placeholder = "Search..." }) => {
  const handleChange = (e) => {
    onSearch?.(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        style={{ padding: "6px", width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
};

export default Search;
