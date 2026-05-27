import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
const PORT = 8005;

app.use(express.json());

app.post("/events",(req,res)=>{
    const events = req.body;
    axios.post("http://localhost:8000/evebts",events)
    axios.post("http://localhost:8001/evebts",events)
    axios.post("http://localhost:8002/evebts",events)
})

app.listen(PORT,()=>{
    console.log(`Snippet server is running at ${PORT}`);
})