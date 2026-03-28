import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Cups order: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Order 1 more</button>
    </div>
  );
};

export default Counter;
