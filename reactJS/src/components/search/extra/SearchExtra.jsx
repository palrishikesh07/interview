import React from "react";

const SearchExtra = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Name"
      />
    </div>
  );
};

export default SearchExtra;
