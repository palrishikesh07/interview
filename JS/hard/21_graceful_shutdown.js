/*
This solution:
- Stops accepting new connections.
- Allows in-flight HTTP requests to finish.
- Closes database connections.
- Forces shutdown if the timeout expires.

*/


const http = require("node:http");
const express = require("express");

const app = express();

app.get("/slow", async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.json({ message: "Request completed" });
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Replace this with your actual database pool/client shutdown.
async function closeDatabase() {
  // Example: await pool.end();
  console.log("Database connections closed");
}

let isShuttingDown = false;

async function gracefulShutdown(server) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Graceful shutdown started");

  // Force termination if shutdown gets stuck.
  const forceExit = setTimeout(() => {
    console.error("Shutdown timed out; forcing exit");
    process.exit(1);
  }, 10000);

  forceExit.unref();

  try {
    // Stop accepting new connections and wait for existing
    // HTTP requests to finish.
    await new Promise((resolve, reject) => {
      server.close(error => {
        if (error) reject(error);
        else resolve();
      });
    });

    // Close the database after requests have finished.
    await closeDatabase();

    clearTimeout(forceExit);
    console.log("Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown failed:", error);
    process.exit(1);
  }
}

process.once("SIGTERM", () => gracefulShutdown(server));
process.once("SIGINT", () => gracefulShutdown(server));


/*

What about background jobs?
For background jobs, stop fetching new jobs when shutdown starts, finish or safely 
release jobs already in progress, and acknowledge a job only after its processing has succeeded. If the deadline expires, let the queue redeliver unacknowledged jobs.
*/