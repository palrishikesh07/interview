import React from 'react'
import WithCounter from './WithCounter'

const ClickCounter1 = (props) => {
    const { count, increment }=props;
    
  return (
   <div>
        <button onClick={increment}>Click Counter</button>
        <h2>Clicked is : {count}</h2>
    </div>
  )
}

export default WithCounter(ClickCounter1);