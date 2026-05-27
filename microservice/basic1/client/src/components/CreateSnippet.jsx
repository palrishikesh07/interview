import React, { useEffect, useState } from 'react'

import axios from "axios"
import CreateComment from './CreateComment';

const CreateSnippet = () => {

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippet, setSnippet] = useState({});

  const createSnippet = async (e) => {
    e.preventDefault();
    console.log(title, code)
    try {
      const res = await axios.post("http://localhost:8000/api/v1/snippet", { title, code });
      console.log(res);
    } catch (error) {
      console.log("errorr ", error)
    }
  }

  useEffect(() => {

    const fetchSnippet = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/snippet");
        console.log(res.data);
        setSnippet(res.data);

      } catch (error) {
        console.warn("error in fetching data");
      }
    }

    fetchSnippet();

  }, [])
  return (
    <div>
      <form onSubmit={createSnippet} className='flex flex-col'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text" placeholder='title' /><br />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='write a code snippets' />
        <input type='submit' />
      </form>

      {
        Object.values(snippet).map((snipt)=>(
          <div className='p-3 border rounded'>
              <h1 className='font-bold text-xl'>{snipt.title}</h1>
               <CreateComment/>
          </div>
         
        ))
      }
    </div>
  )
}

export default CreateSnippet