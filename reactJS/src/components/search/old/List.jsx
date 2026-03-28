import React from "react";

const List = ({ items = [] }) => {
  if (!items || items.length === 0) return <p>No results</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            padding: "8px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{item.title}</span>
          <small style={{ color: item.completed ? "green" : "#999" }}>
            {item.completed ? "done" : "pending"}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default List;
