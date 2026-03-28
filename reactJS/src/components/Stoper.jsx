import React, { useState } from "react";
let intervalRef = undefined;

const Stoper = () => {
  const [timer, setStimer] = useState(0);

  const startTimer = () => {
    intervalRef = setInterval(() => {
      setStimer((timer) => timer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef);
  };

  const reset = () => {
    setStimer(0);
  };
  return (
    <div className="container">
      <h1>{timer}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={startTimer}>Resume</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Stoper;
