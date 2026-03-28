import React, { useState } from "react";

const PRODUCT_LIST = [
  "apps",
  "apple",
  "apply",
  "application",
  "banana",
  "cherry",
  "date",
  "data",
];

const Autofill = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [sugestions, setSugestions] = useState();

  const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
      console.log("Debounced function called with args 1 :", args);

      clearTimeout(timer);
      console.log("Debounced function called with args:", args);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const searchValue = (value) => {
    setInputValue(value);

    const filterSuggestion = PRODUCT_LIST.filter((item) =>
      item.includes(value),
    );
    setSugestions(filterSuggestion);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    debounce(searchValue(value), 2000);
  };
  return (
    <div onResize={() => alert("change in size")}>
      <input
        onResize={() => alert("change in size")}
        onContextMenu={() => alert("hi")}
        type="search"
        value={inputValue}
        onChange={(e) => handleChange(e)}
      />
      <p> Autofill: {inputValue}</p>
      {inputValue && (
        <select>
          {sugestions.map((dropDownValue) => (
            <option>{dropDownValue}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Autofill;
