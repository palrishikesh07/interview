import React, { useEffect, useState } from 'react'

const StartStopTimerWithState = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(()=>{
        if(isRunning){
            
            const id = setInterval(() => {
                   setCount((prev)=>prev+1); 
            }, 1000);


            return ()=>{
                clearInterval(id);
            }
        }

    },[isRunning])


    const handleStop=()=>{
        setIsRunning(false);
        setCount(0);
    }

    return (
        <div>
            <h2>StartStopTimerWithState</h2>
            <p>Count: {count}</p>
            <button onClick={()=>setIsRunning(true)}>Start</button>
            <button onClick={()=>setIsRunning(false)}>Stop</button>
            <button onClick={handleStop}>ReSet</button>
        </div>


    )
}

export default StartStopTimerWithState