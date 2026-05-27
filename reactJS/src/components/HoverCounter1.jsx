import React, { useState } from 'react'
import WithCounter from './WithCounter'

const HoverCounter1 = (props) => {
    const { count, increment }=props;
    
  return (
    <div>
        <button onMouseOver={increment}>Hover Counter</button>
        <h2>Hovered is : {count}</h2>
    </div>
  )
}

export default WithCounter(HoverCounter1,10);