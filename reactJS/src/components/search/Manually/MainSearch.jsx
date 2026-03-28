import React, { useEffect, useState } from "react";
import Search from "./Search";

const MainSearch = () => {
  const [users, setUsers] = React.useState([]);
  const [filterUser, setFilterUser] = useState();

  const getData = () => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.users);
        setUsers(data.users);
        setFilterUser(data.users);
      });
  };

  const handlSearch = (searchText) => {
    const filterData = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilterUser(filterData);
    console.log("filterData: ", filterData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      MainSearch
      {/* <input type="text" onChange={(e) => handlSearch(e.target.value)} /> */}
      <Search handleSearch={handlSearch} />
    </div>
  );
};

export default MainSearch;
