import OpenAI from "openai";
import "dotenv/config";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY


const client = new OpenAI({
    apiKey:OPENAI_API_KEY
})


async function aiAnswer(){
    const respone = await client.responses.create({
        model:"gpt-4o-mini",
        input:"Hi, how are you?"
    });
    
    console.log(respone?.output_text);
}

// aiAnswer();

// process.stdout.write("Please ask your question");
// process.stdin.on("data",(data)=>{
//     const question = data.toString().trim();
//     console.log(question);
//     aiAnswer(question);
// })

const args = process.argv.slice(2); // Defualt 2 show [node executer, current file]
console.log(args);

for (const arg of args) {
    console.log(arg);
    console.log(arg.slice(2))
    console.log(arg.slice(2).split("="))
}