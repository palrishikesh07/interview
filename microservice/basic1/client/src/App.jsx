import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import CreateSnippet from './components/CreateSnippet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <NavBar/>
      <CreateSnippet/>
    </main>
  )
}

export default App
