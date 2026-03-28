// 🔥 Advanced Interview Answer (10/10 Answer)

// Worker Threads are used to offload CPU-bound tasks within the same process using multiple threads.
// Cluster module is used to scale Node.js applications by creating multiple worker processes that share the same server port and utilize multi-core systems.


// Cluster is used to scale Node.js applications across multiple CPU cores by forking multiple worker processes.Each worker runs independently but shares the same server port.Communication between master and workers happens via IPC using process.send() and worker.on('message').It improves throughput for high - traffic applications but does not share memory.

const cluster = require("cluster");
const http = require("http");
const os = require("os");

if (cluster.isPrimary) {
    const cpuCount = os.cpus().length;
    console.log("Cpu Count: ", cpuCount)
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork();
    })

}
else {
    http.createServer((req, res) => {
        res.end(`Handled by process ${process.pid}`)
    }).listen(3100);
    console.log(`Worker ${process.pid} started`)
}

// throw new ReferenceError("gihui")
// throw new URIError("kk");
// throw new AggregateError("ji")


// Latency refers to the time taken to process a single request from start to finish, whereas throughput refers to the number of requests a system can handle in a given period of time. Low latency improves user experience, while high throughput improves system capacity.