// const speech = require('@google-cloud/speech');
// const fs = require('fs');

// const client = new speech.SpeechClient();

// async function transcribe() {
//     const audio = {
//         content: fs.readFileSync("Record1.mp3").toString("base64"),
//     };

//     const config = {
//         encoding: "MP3",
//         sampleRateHertz: 16000,
//         languageCode: "en-US",
//     };

//     const request = { audio, config };

//     const [response] = await client.recognize(request);
//     const transcription = response.results
//         .map(result => result.alternatives[0].transcript)
//         .join("\n");

//     console.log("Transcript:", transcription);
// }

// transcribe();

import OpenAI from "openai";
import fs from "fs";

// Replace with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function transcribeAudio() {
    try {
        const response = await openai.audio.transcriptions.create({
            file: fs.createReadStream("JustinSong.mp3"), // your audio file
            model: "whisper-1"
        });

        console.log("Transcription:", response.text);
    } catch (error) {
        console.error("Error:", error);
    }
}

transcribeAudio();


// Voice Recorder is completely free. No hidden payments, activation fees, or charges for extra features.
// Hi, my name is Rishi Gaspar, there is some text which I want to read for now, free to use, 
// voice recorder is completely free, no hidden payments, activation phase or charges for extra features.
