import React, { useCallback, useState } from 'react'
// memo is a higher order component that will prevent a component from re-rendering if its props have not changed. useCallback is a hook that returns a memoized version of the callback function that only changes if one of the dependencies has changed. In this example, the Child component will only re-render when the handleClick function changes, which will only happen when the count state changes.
const Child = React.memo(({ onClick }) => {
    console.log("Child component rendered");
    return <button onClick={onClick}>Click me</button>;
});

const CallbackMemo = () => {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []);
  return (
   <>
    <div>CallbackMemo</div>
    <h2>{count}</h2>
    <button onClick={()=>setCount(prevCount => prevCount + 1)}>+</button>
    <Child onClick={handleClick} />
   </>
  )
}

export default CallbackMemo