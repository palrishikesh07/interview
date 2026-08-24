

const { rejects } = require("assert");
const express = require("express");

const { Worker } = require("worker_threads");


const app = express();
const PORT = process.env.PORT || 3000;

const THREAD_COUNT = 4;


function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four-worker.js", {
            workerData: { thread_count: THREAD_COUNT }
        });

        worker.on('error', (error) => {
            reject(`An error occurs ${error}`);
        })

        worker.on('message', (data) => {
            resolve(data);
        })
    })
}


app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
})


app.get("/blocking-worker-thread-parallel", async (req, res) => {
    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }

    const thread_result = await Promise.all(workerPromises);

    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3];
    res.status(200).send(`The result is ${total}`);

});




app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})

