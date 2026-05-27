import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Home } from './components/routers/pages/Home.jsx'
import About from './components/routers/pages/About.jsx'
import Contact from './components/routers/pages/Contact.jsx'


createRoot(document.getElementById('root')).render(
    // <StrictMode>
      <App />
    // </StrictMode>
)
  