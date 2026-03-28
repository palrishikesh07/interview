import React, { useEffect, useState } from "react";

const useFetchAPI = (url) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data is ", data);
        setLoading(false);
        setData(data?.users);
      })
      .catch(() => {
        setError(true);
      });
  }, [url]);

  return {
    data,
    isLoading,
    isError,
  };
};

//https://dummyjson.com/users
export default useFetchAPI;
