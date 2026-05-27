// 👉 Features:
// Add
// Delete
// Toggle complete
// 👉 Bonus:
// Persist in localStorage

import React, { useState } from 'react'


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text,setText]=useState("");

  const addTask=()=>{
    setTodos([...todos,{id:Date.now(),text,done:false}])
  }

  const remove=(id)=>{
    console.log(id)
    setTodos(todos.filter(t=>t.id!==id));
  }

  const toggle=(id)=>{
    console.log(id)
    setTodos(todos.map(t=>t.id === id ?{...t,done:!t.done}:t))
  }
  return (
    <>
      <div>Todo</div>
      <input 
      value={text}
      onChange={e=>setText(e.target.value)}
      type='text' />
      <button onClick={addTask}>Add</button>

      {
        todos.map(t=>(
          <div key={t.id}>
            <span 
            onClick={()=>toggle(t.id)}
            style={{textDecoration:t.done ? "line-through":""}}
            >
              {t.text}
              </span>
            <button onClick={()=>remove(t.id)}>Remove</button>
          </div>
        ))
      }
    </>
  )
}

export default Todo