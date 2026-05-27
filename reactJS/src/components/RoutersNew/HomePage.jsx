import React from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
    const navigate  = useNavigate();

    function handleClick(){
        navigate('/dashboard');
    }
  return (
    <div><h2>HomePage</h2>
    <button onClick={handleClick}>
        Move to Dashboard
    </button>
    </div>
  )
}

export default HomePage