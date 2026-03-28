// Worker threads are used in Node.js to run CPU - intensive tasks in parallel threads so that the main event loop remains non - blocking.
// 🎯 Interview Definition
// Worker Thread
// Worker Threads run JavaScript in parallel threads inside the same Node.js process.
// Child Process

// Child Process creates a completely new Node.js process with separate memory.
const { Worker } = require("worker_threads");

console.log("Start");

const worker = new Worker("./worker.js");

worker.on("message", (result) => {
    console.log("Result: ", result);
})

// worker.on("error", (err) => {
//     console.log("Error: ", err);
// })

// worker.on("exit", (code) => {
//     console.log("Worker exited with code: ", code)
// })

console.log("End");



/*

worker.js
const { parentPort } = require("worker_threads");

parentPort.on("message", (msg) => {
  const result = msg * 2;
  parentPort.postMessage(result);
});


index.js

const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.postMessage(10);

worker.on("message", (result) => {
  console.log("Result from worker:", result);
});
*/