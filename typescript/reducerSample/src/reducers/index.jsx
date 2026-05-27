import React, { act, useReducer } from 'react'

const ReducerComponent = () => {

    const reducerFn=(state,action)=>{
        if(action.type === "INCREMENT"){
            return state+1;
        }
        if(action.type == "DECREMENT"){
            return state-1;
        }
    }
    const [count,dispatchFn]= useReducer(reducerFn,0);


  return (
   <>
    <div>index</div>
    <p>{count}</p>
    <button onClick={()=>dispatchFn({type:"INCREMENT"})}>Increment</button>
    <button onClick={()=>dispatchFn({type:"DECREMENT"})}>Decrement</button>
    </>
  )
}

export default ReducerComponent