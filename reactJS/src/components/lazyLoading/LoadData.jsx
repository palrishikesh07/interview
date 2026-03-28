import React, { useState, useEffect } from "react";

const LoadData = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return <> {isVisible && <div>Data loaded successfully!</div>} </>;
};

export default LoadData;
