import React, { useEffect, useState } from "react";

const useCustomDebounce = (value, delay = 1500) => {
  const [debouncValue, setDebounceValue] = useState();
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncValue;
};

export default useCustomDebounce;
