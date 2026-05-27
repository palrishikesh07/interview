import React, { useRef } from 'react'
import ImperativeChild from './ImperativeChild'

const ImperativeParent = () => {

  const inputRefForChild = useRef();

  return (
    <div>
      <h2>ImperativeParent</h2>
      <button onClick={() => inputRefForChild.current.focus_custom()}>
        Focus
      </button>
      <button onClick={() => inputRefForChild.current.clear()}>
        Clear
      </button>
      <ImperativeChild ref={inputRefForChild} />
    </div>
  )
}

export default ImperativeParent