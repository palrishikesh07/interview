import OpenAI from "openai";
import {data} from "./temp.js";
import 'dotenv/config';
import { encoding_for_model } from "tiktoken";
const project = "gen ai node";



const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const client = new OpenAI({apiKey:OPENAI_API_KEY});



// const response = await client.responses.create({
//     input:"What is color of cloud",
//     model:"gpt-4o-mini",
// });


// const response = await client.responses.create({
//     instructions:"Give result in 10 words",
//     input:"What is color of cloud",
//     model:"gpt-4o-mini",
// });


// const response = await client.responses.create({
//     input:[
//         {role:'system', content:"Answer in hindi language"},
//         {role:'developer', content:"Gave a basic example in JS"},
//         {role:"user",content:"What is coding"}
//     ],
//     model:"gpt-4o-mini",
// });

const prompt = "What is AI";
const model = "gpt-4o-mini";

const response = await client.responses.create({
    input:[
        {role:"user",content:prompt}
    ],
    model,
    // temperature:0,
    max_output_tokens:16,
    store:true
});

// console.log(response?.usage);

// console.log(response?.output_text);
// console.log(response);


// const oldResponse =  await client.responses.retrieve("resp_0c6d75a86d806f69006a709e32076c8192bf2fe749093fd4b8");
// console.log(oldResponse)


function calculateToken(){
    const encoder = encoding_for_model(model);
    const tokenData = encoder.encode(prompt);
    console.log(tokenData);
}

calculateToken();

