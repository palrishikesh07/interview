const express = require("express");
const fs = require('fs');
const app = express();

// Helper function to format bytes into readable Megabytes (MB)
const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

// ❌ BAD - Loads entire file into memory
app.get("/download/bad", (req, res) => {
    // 1. Capture initial performance metrics
    const startTime = performance.now();
    const startMemory = process.memoryUsage().heapUsed;

    fs.readFile("./large-file.pdf", (err, data) => {
        if (err) return res.status(500).send('Error');
        res.send(data); // Load all data at onces
    })

    // 2. Capture metrics after data is read and sent
    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;
    console.log("\n========= ❌ /download/bad METRICS =========");
    console.log(`Execution Time : ${(endTime - startTime).toFixed(2)} ms`);
    console.log(`Memory Used    : ${toMB(endMemory - startMemory)} MB`);
    console.log(`Total Heap Size: ${toMB(process.memoryUsage().heapUsed)} MB`);
    console.log("=============================================");
})

app.get('/download/good', (req, res) => {
    const startTime = performance.now();
    const startMemory = process.memoryUsage().heapUsed;

    const stream = fs.createReadStream("./large-file.pdf");
    stream.on("error", (err) => {
        res.status(500).json({ error: "File not found" });
    })

    stream.pipe(res);

    stream.on("end", () => {
        const endTime = performance.now();
        const endMemory = process.memoryUsage().heapUsed;
        console.log("\n=========    /download/good METRICS =========");
        console.log(`Execution Time : ${(endTime - startTime).toFixed(2)} ms`);
        console.log(`Memory Used    : ${toMB(endMemory - startMemory)} MB`);
        console.log(`Total Heap Size: ${toMB(process.memoryUsage().heapUsed)} MB`);
        console.log("=============================================");
    });
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})