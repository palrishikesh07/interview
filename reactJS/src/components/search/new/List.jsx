import React from "react";

const List = ({ data }) => {
  return data ? (
    <>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div>No Data available</div>
  );
};

export default List;
