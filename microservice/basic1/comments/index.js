import express from "express";
import commentRouter from "./routes/comment.js";
import cors from "cors";
const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/api/v1/comment",commentRouter)

app.listen(PORT,()=>{
    console.log(`Snippet server is running at ${PORT}`);
})