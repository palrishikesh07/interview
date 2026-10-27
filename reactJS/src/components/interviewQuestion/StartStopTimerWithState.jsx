
import React, { useEffect, useState } from 'react'

const StartStopTimerWithState = () => {

    const [counter, setCounter] = useState(0);
    const [isStarted,setIstStarted]=useState(false);


    useEffect(()=>{
        if(isStarted){
            const id = setInterval(() => {
                setCounter((prev)=>prev+1);
            }, 1000);

            return ()=>{
                clearInterval(id);
            }
        }

    },[isStarted])

    const startHandler=()=>{
        setIstStarted(true);
    }
    const stopHandler=()=>{
        setIstStarted(false);
    }
    const resetHandler=()=>{
        setCounter(0);
        setIstStarted(false)
    }

    return (
        <div>
            <p>{ counter}</p>
            <button onClick={startHandler}>Start</button><br /><br />
            <button onClick={stopHandler}>Stop</button><br /><br />
            <button onClick={resetHandler}>Reset</button><br /><br />
        </div>
    )
}

export default StartStopTimerWithState