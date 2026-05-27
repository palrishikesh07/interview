import React, { useState, useTransition } from "react";

export default function UseTransitionExample() {
  // Large dataset (simulate heavy work)
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState(items);

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    // ✅ Urgent update (typing should be fast)
    setQuery(value);

    // ❗ Non-urgent update (heavy filtering)
    startTransition(() => {
      setTimeout(() => {
        const result = items.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredList(result);
      }, 2000);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>useTransition Example</h2>

      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={handleChange}
      />

      {/* Show loading while transition is happening */}
      {isPending && <p>Filtering list...</p>}

      <ul>
        {filteredList.slice(0, 50).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}