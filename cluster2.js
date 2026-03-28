const cluster = require("cluster");
const http = require("http");
const os = require("os");

const PORT = 3100;
const SHUTDOWN_AFTER = 10_000; // milliseconds before initiating shutdown
const GRACE_PERIOD = 5_000;    // milliseconds to wait for worker shutdown

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;
    console.log("Cpu Count: ", cpuCount);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Optionally restart worker
        cluster.fork();
    });

    // After SHUTDOWN_AFTER ms, tell workers to shutdown gracefully
    setTimeout(() => {
        console.log("Master: initiating graceful shutdown");
        for (const id in cluster.workers) {
            const worker = cluster.workers[id];
            if (!worker) continue;
            worker.send("shutdown");
            // Force kill if worker doesn't exit within the grace period
            setTimeout(() => {
                if (worker && worker.isConnected()) {
                    console.log(`Master: force killing worker ${worker.process.pid}`);
                    worker.kill("SIGTERM");
                }
            }, GRACE_PERIOD);
        }

        // Optionally exit master after all workers were given time to exit
        setTimeout(() => process.exit(0), GRACE_PERIOD + 1000);
    }, SHUTDOWN_AFTER);

} else {
    // Worker: keep reference to server so we can close it
    const server = http.createServer((req, res) => {
        res.end(`Handled by process ${process.pid}`);
    });

    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started`);
    });

    // Respond to master shutdown message
    process.on("message", (msg) => {
        if (msg === "shutdown") {
            console.log(`Worker ${process.pid} shutting down`);
            // Stop accepting new connections, finish existing requests, then exit
            server.close(() => {
                process.exit(0);
            });
            // Force exit if graceful close takes too long
            setTimeout(() => process.exit(1), GRACE_PERIOD - 500);
        }
    });

    // Also handle disconnect if master disconnects
    process.on("disconnect", () => {
        server.close(() => process.exit(0));
    });
}