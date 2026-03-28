import React, { useEffect, useState } from "react";
import Search from "./Search";
import List from "./List";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const Main = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setOriginalData(data);
          setFilteredData(data);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = (query) => {
    const q = (query || "").toLowerCase();
    if (!q) {
      setFilteredData(originalData);
      return;
    }

    const filtered = originalData.filter((item) => {
      // Search across a few fields; make everything a string and compare case-insensitively
      return [item.title, item.id, item.userId]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h3>Search Todos</h3>
      <Search onSearch={handleSearch} placeholder="Search todos..." />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && <List items={filteredData} />}
    </div>
  );
};

export default Main;
