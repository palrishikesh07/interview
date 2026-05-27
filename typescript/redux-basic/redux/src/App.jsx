import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const count = useSelector((state)=>state.count);
  const dispatch = useDispatch();

  return (
  <>
  <h2>Counter with Redux</h2>
  <h1>{count}</h1>
  <button onClick={()=>dispatch({type:"increment"})}>+</button>
  <button onClick={()=>dispatch({type:"decrement"})}>-</button>
  </>)
}

export default App
