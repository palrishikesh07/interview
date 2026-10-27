// import React, { useEffect, useRef, useState } from 'react'

// const StartStopTimer = () => {
//     const [time, setTime] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);
//     const intervalRef = useRef(null);


//     useEffect(()=>{
//         if(isRunning){
//             intervalRef.current = setInterval(()=>{
//                 setTime((prev)=>prev+1);
//             },1000)
//         }
//         else{
//                 clearInterval(intervalRef.current);
//         }
//     },[isRunning])
    
//     const handlerStart=()=>{
//         setIsRunning(true);
//     }

//     const handleStop=()=>{
//         setIsRunning(false);
//     }

//     const handleReset=()=>{
//         setTime(0);
//         setIsRunning(false);
//     }



//     return (
//         <div>
//             <h2>Start,Stop, Reset Timer</h2>

//             <p>Timer: {time}</p>
//             <button onClick={handlerStart}>
//                 Start
//             </button>
//             <br /><br />
//             <button onClick={handleStop}>
//                 Stop
//             </button>
//             <br /><br />
//             <button onClick={handleReset}>
//                 Re Set
//             </button>
//         </div>
//     )
// }

// export default StartStopTimer

import React, { useEffect, useRef, useState } from 'react'

const StartStopTimer = () => {
    const [counter, setCounter]=useState(0);
    const [isStarted, setIsStarted]=useState(false);
     const intervalRef = useRef(null);
    useEffect(()=>{

        if(isStarted){
            intervalRef.current = setInterval(() => {
                setCounter((prev)=>prev+1);
            }, 1000);

            return ()=>{
                clearInterval(intervalRef.current);
            }
        }

    },[isStarted])


    const handleStart=()=>{
        setIsStarted(true);
    }

    const handleStop=()=>{
        setIsStarted(false);
    }

    const handleReset=()=>{
        setIsStarted(false);
        setCounter(0)
    }


  return (
    <div>
        <p>{counter}</p>
        <button onClick={handleStart}>Start</button><br/><br/>
        <button onClick={handleStop}>Stop</button><br/><br/>
        <button onClick={handleReset}>Reset</button><br/><br/>
    </div>
  )
}

export default StartStopTimer