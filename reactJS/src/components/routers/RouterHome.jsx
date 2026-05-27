import React from 'react'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './Navbar'

const RouterHome = () => {
  return (
    <div>
        <header>
            <Navbar/>
        </header>
        <h1>RouterHome</h1>
            {/* New Router Way */}

            {/* Old router Way */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
            </Routes>
    </div>
  )
}

export default RouterHome