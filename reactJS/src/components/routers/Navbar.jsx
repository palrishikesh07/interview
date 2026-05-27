import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
    </ul>
  )
}

export default Navbar