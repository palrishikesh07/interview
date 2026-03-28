import React from "react";

const ListExtra = ({ filterData }) => {
  return (
    <div>
      <h3>ListExtr</h3>

      <p>Filter Item:{filterData.length}</p>
      <ul>
        {filterData.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListExtra;
