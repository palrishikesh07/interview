import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './counterSlice';

const Counter = () => {
    const count = useSelector((state)=>state.count);
    const dispatch = useDispatch();
  return (
    <div>
        <h2>Counter</h2>
        <h3>{count}</h3>
        <button onClick={()=>dispatch(increment())}> + </button>
        <button onClick={()=>dispatch(decrement())}> - </button>

    </div>
  )
}

export default Counter