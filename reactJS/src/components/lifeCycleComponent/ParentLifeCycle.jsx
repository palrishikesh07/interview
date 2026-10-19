import React, { useState } from 'react'
import ChildLifecycle from './ChildLifecycle';
import "./Cycle.css";

const ParentLifeCycle = () => {
  const [parentCount, setParentCount] = useState(0);
  const [showChild, setShowChild] = useState(false);
  
  console.log("Parent: Render");

  return (
    <div className="app">
      <h1>React Functional Lifecycle</h1>
      <h2>Parent Component</h2>
      <p>Parent Count: {parentCount }</p>
      <br/>
      <button onClick={()=>setParentCount((prev)=>prev+1)}>
        Update Parent
      </button>
      <br/><br/>
      <button onClick={()=>setShowChild(!showChild)}>
        Toggle Child
      </button>
      {
        showChild && <ChildLifecycle/>
      }
    </div>
  )
}

export default ParentLifeCycle