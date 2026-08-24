const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

const PORT = process.env.PORT || 3000;

const THREAD_COUNT = 4;

const workers = [];
const jobs = [];

// Create workers once
for (let i = 0; i < THREAD_COUNT; i++) {

    const worker = new Worker("./four-worker.js");

    worker.busy = false;

    workers.push(worker);
}


// Add job to queue
function runWorker() {

    return new Promise((resolve, reject) => {

        jobs.push({
            resolve,
            reject
        });

        processJobs();
    });
}


// Assign jobs to free workers
function processJobs() {

    for (const worker of workers) {

        if (worker.busy) {
            continue;
        }

        if (jobs.length === 0) {
            return;
        }

        const job = jobs.shift();

        worker.busy = true;

        worker.once("message", (result) => {

            worker.busy = false;

            job.resolve(result);

            processJobs();
        });

        worker.once("error", (error) => {

            worker.busy = false;

            job.reject(error);

            processJobs();
        });

        worker.postMessage(THREAD_COUNT);
    }
}


app.get("/non-blocking", (req, res) => {

    res.status(200).send("This page is non-blocking");

});


app.get("/blocking-worker-pool", async (req, res) => {

    try {

        const workerPromises = [];

        for (let i = 0; i < THREAD_COUNT; i++) {

            workerPromises.push(runWorker());

        }

        const results = await Promise.all(workerPromises);

        const total = results.reduce(
            (sum, value) => sum + value,
            0
        );

        res.status(200).send(`The result is ${total}`);

    } catch (error) {

        res.status(500).send("Worker error");

    }

});


app.listen(PORT, () => {

    console.log(`App is listening on port ${PORT}`);

});