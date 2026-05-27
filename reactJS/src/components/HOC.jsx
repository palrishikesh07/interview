import React from 'react'
import ClickCounter from './ClickCounter'
import HoverCounter from './HoverCounter'
import ClickCounter1 from './ClickCounter1'
import HoverCounter1 from './HoverCounter1'

const HOC = () => {
  return (
    <div> 
        <h1>HOC</h1>
        <ClickCounter/>
        <HoverCounter/>
        <h2>HOC Component</h2>
        <ClickCounter1/>
        <HoverCounter1/>
    </div>
  )
}

export default HOC