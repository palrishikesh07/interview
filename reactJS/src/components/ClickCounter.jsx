import React, { useState } from 'react'

const ClickCounter = () => {
    const [count,setCount] = useState(0)
  return (
    <div>
        <button onClick={() => setCount(count + 1)}>Click Counter</button>
        <h2>Clicked is : {count}</h2>
    </div>
  )
}

export default ClickCounter