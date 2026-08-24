const {  workerData, parentPort } = require("worker_threads");

function heavyTask() {
    let counter = 0;
    for (let i = 0; i < 20_000_000_000 / workerData.thread_count ; i++) {
        counter += i;
    }
    return counter;
}

const result = heavyTask();

//Send result back to main thread;
parentPort.postMessage(result);




