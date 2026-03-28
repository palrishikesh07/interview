import React, { useEffect, useState } from "react";
import ListExtra from "./ListExtra";
import SearchExtra from "./SearchExtra";
import useCustomHook from "../../customHooks/useCustomHook";
import useCustomDebounce from "../../customHooks/useCustomDebounce";

const Mainextra = () => {
  const { data, loading, error } = useCustomHook("https://dummyjson.com/users");
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [debValue, setDebValue] = useState();
  const customDeb = useCustomDebounce(searchTerm, 500);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebValue(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    console.log("searing", searchTerm);

    if (searchTerm) {
      const filtersUser = data.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      console.log(filtersUser);
      setFilterData(filtersUser);
    } else {
      setFilterData(data);
    }
  }, [customDeb, data]);

  if (error) {
    return <div>Errr</div>;
  }
  return (
    <div>
      <h1>Mainextra</h1>
      <SearchExtra searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? <p>Loading... </p> : <ListExtra filterData={filterData} />}
    </div>
  );
};

export default Mainextra;
