# Node.js Core Interview Guide

## Easy-to-Remember Questions and Answers (Senior-Level)

> **How to use this guide:** Learn the **short answer** first, then
> explain the details, and finally walk through the code. For long-term
> recall, use the memory hooks and rehearse each answer aloud in 60--90
> seconds.

------------------------------------------------------------------------

## 1. Explain the Node.js event loop and its phases

### Interview question

**What is the event loop in Node.js? Explain its phases and the order of
timers, `setImmediate`, `process.nextTick`, and Promises.**

### Short answer to remember

**The event loop lets Node.js handle many I/O operations without
blocking the JavaScript thread.** Its main phases are **Timers → Pending
callbacks → Poll → Check → Close callbacks**. Between callbacks, Node
processes the `process.nextTick` queue and then Promise microtasks,
subject to Node's scheduling details.

### The phases

1.  **Timers** --- runs callbacks whose `setTimeout()` / `setInterval()`
    thresholds have become eligible. The threshold is not an exact
    execution time.
2.  **Pending callbacks** --- Node.js executes some I/O-related tasks that were delayed from an earlier operation. (callbacks)
3.  **Idle/prepare** --- internal libuv work; usually not something
    application code controls.
4.  **Poll** --- retrieves and processes I/O events; may wait for I/O
    when appropriate.
5.  **Check** --- runs `setImmediate()` callbacks.
6.  **Close callbacks** --- runs close events such as a socket's
    `'close'` event.

**Memory hook:** **T-P-P-C-C** = Timers, Pending, Poll, Check, Close.
(Idle/prepare is an internal phase between Pending and Poll.)

### Example: `nextTick`, Promise, timer, and immediate

``` js
console.log('start');

process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

console.log('end');
```

Typical output from a CommonJS script:

``` text
start
end
nextTick
promise
timeout
immediate
```

The relative order of `setTimeout(..., 0)` and `setImmediate()` **is not
guaranteed** when scheduled from the top-level script; it can vary with
timing and environment. Do not promise a fixed order in an interview.
Inside an I/O callback, `setImmediate()` commonly runs before a
zero-delay timer scheduled there.

### Example: order inside an I/O callback

``` js
const fs = require('node:fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```

`immediate` is expected before `timeout` in this I/O-callback scenario.

### `process.nextTick()` vs Promise microtasks

-   `process.nextTick()` uses Node's next-tick queue.
-   `Promise.then()`, `queueMicrotask()`, and `await` continuations use
    the microtask queue.
-   In typical CommonJS callback execution, Node drains the next-tick
    queue before Promise microtasks.
-   Recursive `process.nextTick()` calls can starve I/O because they
    keep scheduling more work before the event loop continues.

``` js
process.nextTick(() => console.log('tick'));
queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise'));
```

Typical order: `tick`, `microtask`, `promise`. Exact scheduling nuances
can differ by context and module system, so explain the queues rather
than memorizing one output blindly.

### Strong interview answer

"Node.js executes JavaScript on a main thread, while the event loop
coordinates timers and asynchronous I/O completion. The main phases are
timers, pending callbacks, poll, check, and close callbacks.
`setImmediate` runs in the check phase. `process.nextTick` and Promise
microtasks run between regular callback work, with Node's next-tick
queue normally drained first. A zero-delay timeout is a minimum
threshold, not a promise of immediate execution."

------------------------------------------------------------------------

## 2. Node.js is single-threaded. How does it handle concurrency?

### Short answer to remember

**One JavaScript thread, many in-flight operations.** Node delegates I/O
to the operating system and some work to libuv's thread pool. Use
**worker threads for CPU-heavy JavaScript**, and **child processes or
cluster for process isolation / multi-core scaling**.

### What happens under the hood?

-   **JavaScript main thread:** runs application JavaScript and
    callbacks.
-   **Operating system:** handles many network sockets asynchronously.
-   **libuv thread pool:** handles selected tasks such as many
    filesystem operations, `crypto` operations, `zlib`, and some DNS
    work.
-   **Worker threads:** execute JavaScript in separate threads, useful
    for CPU-intensive work.
-   **Child processes:** separate OS processes with their own memory and
    failure boundary.
-   **Cluster:** runs multiple Node processes that can share a server
    port through Node's cluster mechanism.

**Important distinction:** Not every asynchronous API uses the thread
pool. Network I/O is generally handled by the OS/event loop, while some
APIs use libuv's pool.

### Example: blocking vs non-blocking

``` js
const fs = require('node:fs');

// Synchronous: blocks the JavaScript thread until complete.
const text = fs.readFileSync('large.txt', 'utf8');

// Asynchronous: lets Node continue running other JavaScript while I/O completes.
fs.readFile('large.txt', 'utf8', (err, text) => {
  if (err) return console.error(err);
  console.log(text);
});

console.log('This can run while the async read is in progress');
```

### When should you use what?

  -----------------------------------------------------------------------
  Tool                    Best use                Remember
  ----------------------- ----------------------- -----------------------
  Async I/O               Network, database, file Keep the main thread
                          I/O                     free

  `worker_threads`        CPU-heavy JavaScript:   Threads
                          parsing, compression,   
                          image processing,       
                          calculations            

  `child_process`         Run another executable, Processes
                          isolate crashes, invoke 
                          system tools            

  `cluster`               Multiple Node processes Multi-process server
                          serving requests across 
                          CPU cores               

  libuv thread pool       Selected native         Native work behind
                          operations such as      async APIs
                          filesystem, crypto,     
                          zlib                    
  -----------------------------------------------------------------------

### Worker thread example

**`main.js`**

``` js
const { Worker } = require('node:worker_threads');

const worker = new Worker('./cpu-worker.js', {
  workerData: { limit: 100_000_000 }
});

worker.on('message', result => console.log('Result:', result));
worker.on('error', console.error);
worker.on('exit', code => {
  if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
});
```

**`cpu-worker.js`**

``` js
const { parentPort, workerData } = require('node:worker_threads');

let total = 0;
for (let i = 0; i < workerData.limit; i++) {
  total += i;
}

parentPort.postMessage(total);
```

For production, use a **worker pool** rather than creating a new worker
for every small task. Worker startup and data transfer have costs.

### Strong interview answer

"Node is single-threaded for executing JavaScript in a given isolate,
but it is not single-threaded for all work. The event loop coordinates
asynchronous operations, the OS handles network readiness, and libuv's
pool handles selected native tasks. I use worker threads for CPU-heavy
JavaScript, child processes when I need a separate executable or process
isolation, and multiple Node processes when I need to use several CPU
cores."

------------------------------------------------------------------------

## 3. How do you find and fix a memory leak in production?

### Short answer to remember

**Observe → reproduce → capture heap → compare → identify retainers →
fix → verify.**

A memory leak occurs when the application keeps references to objects
that are no longer needed, preventing garbage collection.

### Common causes

-   Unbounded arrays, maps, caches, or in-memory queues.
-   Event listeners added repeatedly but never removed.
-   Timers or intervals that remain active.
-   Closures retaining large objects.
-   Request/session objects accidentally stored globally.
-   Streams or sockets not closed.
-   Native memory or buffers growing outside the JavaScript heap.

### Step 1: inspect memory metrics

``` js
setInterval(() => {
  const m = process.memoryUsage();

  console.log({
    rssMB: Math.round(m.rss / 1024 / 1024),
    heapUsedMB: Math.round(m.heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(m.heapTotal / 1024 / 1024),
    externalMB: Math.round(m.external / 1024 / 1024),
    arrayBuffersMB: Math.round(m.arrayBuffers / 1024 / 1024)
  });
}, 10_000).unref();
```

Know the metrics: - **`heapUsed`**: JavaScript heap currently used. -
**`heapTotal`**: heap space allocated by V8. - **`rss`**: total resident
memory for the process, including more than the JS heap. - **`external`
/ `arrayBuffers`**: memory associated with native allocations and
buffers.

A rising RSS alone does not prove a JavaScript leak. Check trends,
workload, heap, external memory, and garbage collection.

### Step 2: capture and compare heap snapshots

-   Reproduce under a controlled workload if possible.
-   Capture a baseline heap snapshot and another after repeated
    workload.
-   Compare retained objects and **retaining paths** in Chrome DevTools.
-   Use `node --inspect` / `node --inspect=127.0.0.1:9229` in a
    controlled environment and connect DevTools.
-   Tools such as `clinic.js` can help investigate memory and
    performance.

**Production caution:** Heap snapshots can pause the process and may
contain sensitive data. They can also require substantial extra memory.
Prefer a replica or canary, secure access, and an approved capture
procedure. Do not expose the inspector publicly.

### Example leak: unbounded cache

``` js
// BAD: this Map grows forever.
const cache = new Map();

function getUser(id, user) {
  cache.set(id, user);
  return cache.get(id);
}
```

Possible fixes: - Add a maximum size / eviction policy. - Use a TTL when
appropriate. - Avoid caching data that does not need to persist. -
Consider a purpose-built cache with size limits.

### Example leak: listener not removed

``` js
// BAD if called repeatedly on a long-lived emitter.
function handleRequest(emitter) {
  emitter.on('data', data => {
    // Work...
  });
}
```

Safer pattern when the listener is only needed once:

``` js
function handleRequest(emitter) {
  const onData = data => {
    // Work...
    emitter.off('data', onData);
  };

  emitter.on('data', onData);
}
```

The right cleanup depends on whether the listener should be permanent.
Do not remove listeners blindly if other work still needs them.

### Strong interview answer

"I start by correlating RSS, heap used, external memory, request volume,
and restarts. I reproduce the issue under a representative workload,
take heap snapshots before and after, compare retained objects, and
inspect retaining paths. Typical causes are unbounded caches, listeners,
timers, and closures. After fixing the ownership or cleanup issue, I
repeat the same load test and verify memory returns to a stable range.
In production, I protect heap snapshots because they can pause the
process and expose sensitive data."

------------------------------------------------------------------------

## 4. `Promise.all` vs `allSettled` vs `race` vs `any`

### Memory hook

-   **`all` = all must succeed**
-   **`allSettled` = report every result**
-   **`race` = first settled wins**
-   **`any` = first fulfilled wins**

  --------------------------------------------------------------------------------
  Method                   Resolves when     Rejects when        Typical use
  ------------------------ ----------------- ------------------- -----------------
  `Promise.all()`          All inputs        First input         All required API
                           fulfill           rejection           calls

  `Promise.allSettled()`   Every input       Normally does not   Independent jobs;
                           settles           reject due to an    collect successes
                                             input rejection     and failures

  `Promise.race()`         First input       First settled input Timeout/racing
                           settles,          rejects             strategies
                           fulfilled or                          
                           rejected                              

  `Promise.any()`          First input       All inputs reject   Try replicas or
                           fulfills          (with               fallback
                                             `AggregateError`)   providers
  --------------------------------------------------------------------------------

### Code example

``` js
const jobs = [
  Promise.resolve('A'),
  Promise.reject(new Error('B failed')),
  Promise.resolve('C')
];

Promise.all(jobs)
  .then(console.log)
  .catch(err => console.log('all:', err.message));

Promise.allSettled(jobs).then(results => {
  console.log('allSettled:', results);
});

Promise.race(jobs)
  .then(value => console.log('race:', value))
  .catch(err => console.log('race failed:', err.message));

Promise.any(jobs)
  .then(value => console.log('any:', value))
  .catch(err => console.log('all failed:', err.errors));
```

Because Promise callbacks are asynchronous and the first rejection is
already available, `all` and `race` can reject. `allSettled` reports
each outcome. `any` returns the first fulfilled value (`A` here).

### Common trap: `Promise.race` does not cancel losers

A timeout race stops waiting for the original operation, but does not
automatically cancel it.

``` js
function withTimeout(promise, ms) {
  let timer;

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Timed out')), ms);
  });

  return Promise.race([promise, timeout])
    .finally(() => clearTimeout(timer));
}
```

This clears the timer after either outcome, but it **does not cancel**
the underlying operation. Use an `AbortController` when the underlying
API supports cancellation.

### How do you limit concurrency?

`Promise.all(items.map(doWork))` starts all jobs at once. For a very
large list, that can overload an API, exhaust sockets, or use too much
memory.

**Simple batching:**

``` js
async function processInBatches(items, batchSize, doWork) {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    results.push(...await Promise.all(batch.map(doWork)));
  }

  return results;
}
```

This waits for each batch before starting the next. A library such as
`p-limit` can cap the number of in-flight tasks while scheduling work
from a larger list.

``` js
// npm install p-limit
const pLimit = require('p-limit');
const limit = pLimit(5); // At most 5 tasks running at once.

const results = await Promise.all(
  items.map(item => limit(() => doWork(item)))
);
```

**Production tip:** Choose a limit based on downstream capacity, rate
limits, memory, and latency. Concurrency limits do not automatically
implement retries or rate limiting.

### Strong interview answer

"I choose based on failure semantics: `all` when every operation is
required, `allSettled` when I need every outcome, `race` when the first
settlement matters, and `any` when the first success is enough. For
large workloads I cap concurrency with batching or `p-limit`, and I
remember that Promise rejection does not automatically cancel other
tasks."

------------------------------------------------------------------------

## 5. Explain streams and backpressure. Why use `pipeline()` over `.pipe()`?

### Short answer to remember

**Streams process data in chunks; backpressure prevents a fast producer
from overwhelming a slow consumer.** `pipeline()` is generally safer
because it coordinates errors and cleanup across the stream chain.

### Four stream types

1.  **Readable** --- data comes out, e.g. a file read stream.
2.  **Writable** --- data goes in, e.g. a file write stream.
3.  **Duplex** --- readable and writable, e.g. a TCP socket.
4.  **Transform** --- reads, modifies, and writes, e.g. compression.

### What is backpressure?

If a producer emits data faster than a consumer can handle it, buffers
grow and memory usage increases. Writable streams signal backpressure
when `write()` returns `false`; the producer should wait for `'drain'`
before continuing. Stream utilities can manage this coordination for
you.

### `.pipe()` vs `pipeline()`

``` js
const fs = require('node:fs');
const zlib = require('node:zlib');

fs.createReadStream('input.log')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.log.gz'));
```

This is concise, but robust error handling and cleanup across the entire
chain are easier to get wrong.

Prefer `pipeline()` for most production stream chains:

``` js
const fs = require('node:fs');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream/promises');

async function compressFile() {
  await pipeline(
    fs.createReadStream('input.log'),
    zlib.createGzip(),
    fs.createWriteStream('input.log.gz')
  );

  console.log('Compression complete');
}

compressFile().catch(err => {
  console.error('Pipeline failed:', err);
});
```

`pipeline()` forwards errors and destroys connected streams as
appropriate. The Promise-based version is convenient with
`async`/`await`.

### How would you process a 5 GB S3 file in Lambda without loading it into memory?

**Answer:** Stream the object from S3, transform or parse it
incrementally, and stream output to its destination. Do not call
`.transformToString()` or accumulate the whole file in a Buffer/array.

High-level AWS SDK v3 sketch (the exact transform APIs depend on the SDK
version):

``` js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const s3 = new S3Client({});

export const handler = async () => {
  const response = await s3.send(new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: process.env.INPUT_KEY
  }));

  // Node.js Lambda runtimes expose a Node-readable body for S3 GetObject.
  const input = response.Body;

  const processor = new Transform({
    transform(chunk, encoding, callback) {
      try {
        // Process each chunk incrementally.
        // For line-oriented formats, carry any incomplete trailing line
        // into the next chunk; chunks do not necessarily align to records.
        this.push(chunk);
        callback();
      } catch (err) {
        callback(err);
      }
    }
  });

  // Illustrative only: pipe to a real streaming destination in production.
  // For example, a writable upload stream or a file in /tmp.
  await pipeline(input, processor, process.stdout);
};
```

This snippet demonstrates streaming and backpressure, not a complete
S3-to-S3 upload implementation. In Lambda, do not use `process.stdout`
as a data destination for a real file-processing pipeline. Connect to a
real writable destination (such as an upload stream or a file in `/tmp`)
and handle destination errors and multipart upload completion/abort.

**Important architecture point:** A 5 GB object may exceed Lambda's
maximum execution time or practical resource budget depending on
processing speed. Check current Lambda limits and consider splitting the
object, S3 range reads, S3 event-driven chunks, AWS Step Functions,
ECS/Fargate, or AWS Batch for long-running work. Stream processing
reduces memory use; it does not remove execution-time limits.

### Strong interview answer

"Streams avoid buffering an entire dataset in memory. Backpressure
coordinates the producer and consumer so a fast source does not
overwhelm a slow destination. I prefer `pipeline()` because it
propagates errors and cleans up the chain. For a multi-gigabyte S3
object, I stream from `GetObject`, parse chunks carefully, and stream to
a writable destination. I also check Lambda duration and memory limits;
if the job is too large, I split it or use a service designed for longer
workloads."

------------------------------------------------------------------------

## 6. Explain error handling in Node.js

### Short answer to remember

**Handle errors at the boundary where you can recover; otherwise
propagate them to a centralized handler.** Distinguish operational
failures from programmer bugs.

### Operational vs programmer errors

-   **Operational errors:** expected runtime failures such as a network
    timeout, invalid user input, missing record, or unavailable
    dependency. Handle, retry where safe, return an appropriate
    response, or degrade gracefully.
-   **Programmer errors:** bugs such as accessing an invalid property,
    broken assumptions, or unexpected state. Fix the bug; do not pretend
    the process is always safe to continue.

This is a useful distinction, not an absolute rule: classify errors
based on context and whether recovery is safe.

### `try/catch` with async/await

``` js
async function getUser(id) {
  try {
    return await userRepository.findById(id);
  } catch (err) {
    // Add useful context, then propagate or translate the error.
    err.message = `getUser(${id}) failed: ${err.message}`;
    throw err;
  }
}
```

Avoid swallowing errors:

``` js
// BAD: failure is hidden and callers may assume success.
try {
  await saveData();
} catch (err) {
  console.error(err);
}
```

If you cannot recover, rethrow or return an explicit failure result.

### Express centralized error middleware

``` js
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await userRepository.findById(req.params.id);

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Register after routes.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.statusCode || 500;

  // Log detailed diagnostics securely on the server.
  console.error({
    message: err.message,
    code: err.code,
    path: req.path
  });

  res.status(status).json({
    error: {
      message: status >= 500 ? 'Internal server error' : err.message,
      code: err.code || 'INTERNAL_ERROR'
    }
  });
});
```

In Express 5, rejected Promises from async route handlers are forwarded
to error handling automatically; explicit `try/catch` plus `next(err)`
is still useful for clarity and compatibility with Express 4. Never
expose stack traces or secrets in public responses.

### Unhandled rejections and uncaught exceptions

-   **Unhandled rejection:** a Promise rejects without a handler. Attach
    appropriate `.catch()` or use `try/catch` around awaited work.
-   **Uncaught exception:** an exception escapes normal handling. The
    process may be in an unsafe state.
-   Use process-level handlers mainly for logging/telemetry and
    controlled shutdown, not as a substitute for local error handling.
-   In a service, an uncaught exception often warrants terminating and
    letting a process manager/orchestrator restart the process after
    graceful cleanup. Do not continue blindly.
-   Avoid relying on one global handler to make the application "safe."

``` js
process.on('unhandledRejection', reason => {
  console.error('Unhandled rejection:', reason);
  // Alert and follow the service's shutdown policy.
});

process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
  // Perform only controlled, minimal cleanup; normally exit afterward.
  process.exit(1);
});
```

This is an illustrative policy skeleton. In real services, coordinate
shutdown, stop accepting new requests, close resources with a bounded
timeout, and rely on a supervisor to restart the process.

### Should you retry every error?

No. Retry transient errors such as selected timeouts or throttling, with
bounded exponential backoff and jitter. Do not blindly retry validation
errors or non-idempotent operations. Use idempotency keys or
deduplication where needed.

### Strong interview answer

"I use typed/custom errors to carry meaningful codes and status
information, handle recoverable operational failures close to their
source, and centralize HTTP response formatting and logging in Express
middleware. I avoid leaking internals to clients. Unhandled rejections
and uncaught exceptions are safety signals, not normal control flow; I
log them, perform controlled shutdown when appropriate, and let a
supervisor restart the service."

------------------------------------------------------------------------

## 7. CommonJS vs ESM and the impact on Lambda bundle size / tree-shaking

### Short answer to remember

**CommonJS uses `require()` and `module.exports`; ESM uses `import` and
`export`.** ESM has static imports that bundlers can analyze more
easily, often helping tree-shaking. Actual Lambda package size depends
on the bundler, dependencies, and packaging strategy---not just the
module syntax.

### Comparison

  --------------------------------------------------------------------------
  Feature                 CommonJS (CJS)             ECMAScript Modules
                                                     (ESM)
  ----------------------- -------------------------- -----------------------
  Import                  `const x = require('x')`   `import x from 'x'`

  Export                  `module.exports = ...`     `export` /
                                                     `export default`

  Loading model           Traditionally              Static module structure
                          runtime/dynamic            

  Top-level await         No native CJS top-level    Supported in ESM
                          await                      

  Tree-shaking            Harder for bundlers to     Usually easier due to
                          prove unused exports       static imports/exports

  Interop                 Native Node format         Can import CJS with
                                                     interop considerations
  --------------------------------------------------------------------------

### CommonJS example

``` js
// math.cjs
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.cjs
const { add } = require('./math.cjs');
console.log(add(2, 3));
```

### ESM example

``` js
// math.js (in a package configured for ESM)
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

To configure a Node.js project for ESM, use `"type": "module"` in
`package.json` for `.js` files, or use `.mjs`. Use `.cjs` for CommonJS
files when needed. Be mindful of relative import extensions and interop
when migrating.

### How does this affect AWS Lambda?

-   Both formats can be used by supported Node.js Lambda runtimes.
-   ESM's static structure can help bundlers remove unused exports, but
    tree-shaking is not guaranteed. It depends on the bundler, package
    side effects, and dependency design.
-   Bundle with tools such as esbuild when appropriate, and externalize
    AWS SDK modules only when the runtime/package strategy supports it.
-   AWS SDK v3's modular packages can help include only needed
    clients/commands; verify the generated bundle and runtime
    dependencies.
-   Smaller deployment packages can reduce upload/deployment overhead
    and may reduce initialization work, but **cold-start impact is
    workload-dependent**. Measure rather than assuming ESM is
    automatically faster.
-   Test the actual packaged artifact in the target Lambda runtime;
    local development can hide missing dependencies or module-format
    issues.

### Strong interview answer

"CommonJS uses `require` and `module.exports`, while ESM uses static
`import` and `export`. ESM is easier for bundlers to analyze, so it can
improve tree-shaking, but the real outcome depends on the bundler and
dependencies. For Lambda, I measure the bundled artifact, minimize
dependencies, use modular imports, and test cold-start and
initialization performance in the deployed runtime instead of assuming
one module format is always faster."

------------------------------------------------------------------------

# Rapid Revision: 12 one-line answers

1.  **Event loop:** Coordinates callbacks and async I/O; phases include
    timers, pending callbacks, poll, check, and close.
2.  **`setImmediate`:** Runs in the check phase, often before a timer
    scheduled inside an I/O callback.
3.  **`process.nextTick`:** Node's next-tick queue; recursive use can
    starve I/O.
4.  **Concurrency:** One JS execution thread can coordinate many
    in-flight asynchronous operations.
5.  **Worker threads:** Use for CPU-heavy JavaScript, not ordinary
    non-blocking I/O.
6.  **libuv thread pool:** Used by selected filesystem, crypto, zlib,
    and DNS operations.
7.  **Memory leak workflow:** Measure, reproduce, compare heap
    snapshots, inspect retaining paths, fix, and verify.
8.  **`Promise.all`:** Fails fast when an input rejects; it does not
    automatically cancel other operations.
9.  **`Promise.allSettled`:** Waits for every input to settle and
    reports each outcome.
10. **Backpressure:** Prevents a fast producer from overwhelming a
    slower consumer.
11. **`pipeline()`:** Helps propagate errors and clean up a stream
    chain.
12. **ESM and tree-shaking:** Static imports are easier to analyze, but
    actual bundle-size wins must be measured.

------------------------------------------------------------------------

# Practice questions for self-testing

Try answering each in 60--90 seconds without looking at the guide:

-   [ ] Explain the event loop phases and the scheduling queues.
-   [ ] Why can top-level `setTimeout(0)` and `setImmediate()` appear in
    either order?
-   [ ] How can Node handle thousands of open network connections?
-   [ ] Worker thread vs child process vs cluster?
-   [ ] What would you inspect if RSS rises but `heapUsed` stays stable?
-   [ ] How do you identify the retaining path for a leaked object?
-   [ ] When would you choose `allSettled` instead of `all`?
-   [ ] Why does `Promise.race()` not implement cancellation?
-   [ ] How would you cap concurrency to five requests?
-   [ ] Explain backpressure to a junior developer.
-   [ ] How would you process a multi-gigabyte S3 object safely?
-   [ ] How do you distinguish an operational error from a programmer
    error?
-   [ ] What should happen after an uncaught exception in a production
    service?
-   [ ] How can ESM help tree-shaking, and what should you measure in
    Lambda?

## Final memory framework

For most Node.js core questions, answer in this order:

**WHAT it is → HOW it works → WHEN to use it → PITFALL → EXAMPLE.**

That structure makes your answer clear, practical, and easy to remember
in a senior-level interview.
