import { snippet } from "../database/index.js";
import {randomBytes} from "crypto";
 

export const createSnippet=(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title,code} = req.body;
    snippet[id]={
        id,
        title,
        code
    }
    return res.json({
        sucess:true,
        snippet:snippet[id],
        message:"Snippet created succesfully"
    }).status(201)
}

export const getSnippet=(req,res)=>{
    return res.status(200).json(snippet);
}