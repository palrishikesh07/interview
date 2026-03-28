import React, { useState } from "react";
import { useEffect } from "react";

const useCustomHook = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getAPIData = async (url) => {
    try {
      console.log("Url: ", url);
      const res = await fetch(url);
      const data = await res.json();
      setData(data.users);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAPIData(url);
    }, 5000);
  }, [url]);
  return {
    data,
    loading,
    error,
  };
};

export default useCustomHook;
