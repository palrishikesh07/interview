import { commentsDB } from "../database/index.js";
import {randomBytes} from "crypto";


export const createComment=(req,res)=>{
    const id = randomBytes(4).toString("hex");
    const {text} = req.body;
    const snippedId = req.params.id;
    const comments = commentsDB[snippedId] || [];

    //create Comments
     comments.push({
        id,text
     })

     commentsDB[snippedId] = comments;

     return res.status(201).json({
        sucess:true,
        message:"Comment added",
        comment:{id,text}
     })

}

export const getCommentBySnippetId=(req,res)=>{
    const snippedId = req.params.id;

    return res.status(200).json(commentsDB[snippedId] || []);

}