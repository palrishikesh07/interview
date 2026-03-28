import React from "react";

let digitalTimer = new Date().toLocaleTimeString();
const Timer = () => {
  const [time, setTime] = React.useState(digitalTimer);
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);
  return <div>{time}</div>;
};

export default Timer;
