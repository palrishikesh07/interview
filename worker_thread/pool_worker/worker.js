const { parentPort } = require("worker_threads");

function heavyTask(threadCount) {

    let counter = 0;

    for (let i = 0; i < 20_000_000 / threadCount; i++) {

        counter += i;

    }

    return counter;
}


parentPort.on("message", (threadCount) => {

    const result = heavyTask(threadCount);

    parentPort.postMessage(result);

});
