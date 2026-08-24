import cluster from "cluster";
import os from "os";

import { dirname } from "path";   // This is used to get the directory name of the current module file. In Node.js, when using ES modules, `__dirname` is not available by default, so we use `fileURLToPath` and `dirname` to derive it from the module's URL.
import { fileURLToPath } from "url"; // This is used to convert a file URL to a file path. In Node.js, when using ES modules, `__filename` and `__dirname` are not available by default, so we use `fileURLToPath` to derive them from the module's URL.

const __dirname = dirname(fileURLToPath(import.meta.url));  // This line combines the previous two imports to create a `__dirname` variable that holds the directory name of the current module file. It uses `fileURLToPath` to convert the module's URL to a file path, and then `dirname` to get the directory name from that path. This is necessary because in ES modules, `__dirname` is not available by default, so we need to derive it manually.

const cpuCount = os.cpus().length;

console.log(`Total number of CPUs is ${cpuCount}`);
console.log(`Primary pid = ${process.pid}`);

// Setup the cluster primary process to execute the index.js file, which contains the Express server code. This allows the primary process to manage worker processes that will handle incoming requests.
cluster.setupPrimary({
    exec:__dirname + "/index.js", 
});

for(let i=0; i<cpuCount; i++){
    cluster.fork(); // This line creates a new worker process for each CPU core available. The `cluster.fork()` method spawns a new Node.js process that runs the code specified in the `exec` option of `setupPrimary`. Each worker will handle incoming requests independently, allowing for better utilization of system resources and improved performance for CPU-intensive tasks.
}


// This event listener is triggered when a worker process exits, either due to an error or because it was killed. When a worker exits, the primary process logs the event and immediately starts a new worker process to replace the one that exited. This ensures that the application continues to run with the same number of worker processes, maintaining its ability to handle incoming requests efficiently.
cluster.on("exit",(worker,code, signal)=>{
    console.log(`Worker ${worker.process.pid} has been killed`);
    console.log("Stated another worker");
    cluster.fork();
})