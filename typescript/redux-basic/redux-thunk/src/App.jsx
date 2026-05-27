import { useState } from 'react'
import './App.css'
import { fetchTodos } from './redux/todoSlice'
import { useDispatch, useSelector } from 'react-redux'

  
function App() {
  const dipatch = useDispatch();

  const state = useSelector((state)=>state);
  console.log(state);

  if(state.todo.isLoading){
    return <h2>Loading...</h2>
  }

  return ( 
    <>
    <h2>Redux with Saga</h2>
    <button onClick={(e)=>dipatch(fetchTodos())}>Fetch Todo</button>

      {
        state.todo.data && state.todo.data.map((e)=>(
          <li>{e.title}</li>
        ))
      }
   </>
  )
}

export default App
