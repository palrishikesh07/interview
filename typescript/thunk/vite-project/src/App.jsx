import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './redux/slice/todo'


function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todo);  

  if(todoData.loading){
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Hi</h2>
      <button onClick={() => dispatch(fetchTodos())}> Fetch Todos</button>
      {
        todoData.data.length > 0 && todoData.data.map((item) => <p key={item.id}>{item.title}</p>)
      }
    </>
  )
}

export default App
