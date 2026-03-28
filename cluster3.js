const cluster = require("cluster");
const http = require("http");
const os = require("os");

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on("message", (worker, message) => {
        console.log(`Worker ${worker.process.id} sent message: ${message}`);
    });

    //exit
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.id} exited with code ${code} and signal ${signal}`)
        cluster.fork();
    })
}
else {
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end(`handled by worker ${process.pid}`)
        process.send({ msg: `Request handler by  ${process.pid}` })
    })

    server.listen(3100);
    console.log(`handled by worker ${process.pid}`)


}