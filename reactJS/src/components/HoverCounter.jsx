import React, { useState } from 'react'

const HoverCounter = () => {
    const [count,setCount]=useState(0)
  return (
    <div>
        <button onMouseOver={()=>setCount(count+1)}>Hover Counter</button>
        <h2>Hovered is : {count}</h2>
    </div>
  )
}

export default HoverCounter