import { useState } from "react"


function App() {
  const [text,setText]= useState("");
  const handleSubmit=()=>{
    const event = new CustomEvent("profileTextSubmit",{
      detail: {
        name:text
      }
    })

    dispatchEvent(event);
  }
  return (
    <>
      <h2>Profile Page</h2>
      <p>This is the profile page of the micro frontend application.</p>
      <div>
        <input 
        type="text" 
        placeholder="Enter your text content" 
        value={text}
        onChange={(e)=>setText(e.target.value)}
          />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default App

