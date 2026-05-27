import express from "express";
import snippetRouter from "./routes/snippet.js";
import cors from "cors";
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use("/api/v1/snippet",snippetRouter);


app.listen(PORT,()=>{
    console.log(`Snippet server is running at ${PORT}`);
})