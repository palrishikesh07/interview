
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { decrement, increment, incrementByAmount, reset } from './feature/counter/counterSlice';
import { useState } from 'react';

function App() {

  const [amount,setAmount ] = useState(0);
  const count = useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement=()=>{
    dispatch(increment());
  }

  const handleDecrement=()=>{
    dispatch(decrement());
  }

  const handleRest=()=>{
    dispatch(reset());
  }

  const handleIncrementAmount=()=>{
    dispatch(incrementByAmount(amount));
  }

  return (
    <div className='container'>
      <h2>Redux Toolkit</h2>
      <button onClick={handleIncrement}>+</button>
      <p>Count: {count}</p>
      <button onClick={handleDecrement}>-</button>
      <br/>
      <button onClick={handleRest}>Reset</button>
      <br/>
      <input type='number' 
      value={amount} 
      placeholder='Enter Amount'
      onChange={(e)=>setAmount(e.target.value)}
      />
       <br/>
      <button onClick={handleIncrementAmount}>Increment By Amount</button>
      <br/>
    </div>
  )
}

export default App
