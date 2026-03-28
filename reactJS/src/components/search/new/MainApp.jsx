import React, { useEffect, useState } from "react";
import useFetchSearch from "../../customHooks/useFetchSearch";
import List from "./List";
import SearchApp from "./SearchApp";
import useDebounce from "../../customHooks/useDebounce";

const MainApp = () => {
  const { data, loading, error } = useFetchSearch(
    "https://dummyjson.com/users",
  );
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (data?.users) {
      setFilterData(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (data?.users && searchTerm !== "") {
      const filtered = data.users.filter((user) => {
        return `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(debounceSearch.toLowerCase());
      });
      setFilterData(filtered);
    }
    if (searchTerm === "") {
      setFilterData(data?.users || []);
    }
  }, [debounceSearch, data]);

  return (
    <div>
      <h1>MainApp Search</h1>

      <SearchApp searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? <p>Loading...</p> : <List data={filterData} />}
    </div>
  );
};

export default MainApp;
