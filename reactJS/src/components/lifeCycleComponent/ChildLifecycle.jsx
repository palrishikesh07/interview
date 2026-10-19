import React, { useEffect, useState } from 'react'
import "./Cycle.css";
const ChildLifecycle = () => {

  const [count, setCount] = useState(0);

  console.log("Child: Render");

  // 1. Mounting and unmounting
  useEffect(()=>{
    console.log("Child: Mounted")

    return ()=>{
      console.log("Child: Unmounted - Cleanup")
    }
  },[]);

  // 2. Run when count changes
  useEffect(()=>{
    console.log("Count effect: Setup ",count)

    return ()=>{
      console.log("Count effect: Cleanup",count)
    }

  },[count])
   // 3. Run after every committed render

   useEffect(()=>{
    console.log("Every-render effect: Setup");

    return ()=>{
      console.log("Every-render effect: Cleanup")
    }
   })

  return (
    <div className='child'>
      <h2>child Component</h2>
      <p>child Count: {count}</p>

      <button onClick={()=>setCount((prev)=>prev+1)}>
        Increae Child Count
      </button>
    </div>
  )
}

export default ChildLifecycle