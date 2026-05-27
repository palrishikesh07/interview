import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ReducerComponent from './reducers'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <ReducerComponent/>
  </>
  )
}

export default App
