/*

🔥 What is libuv in Node.js?
libuv is a C library that gives Node.js its asynchronous, non-blocking power 💪
libuv is a C-based library used by Node.js to implement the event loop, async I/O operations, and thread pool management.
V8 executes JavaScript code, while libuv handles asynchronous operations and implements the event loop in Node.js.

It handles:
Event Loop
Async I/O (file system, network, DNS)
Thread Pool
Timers


libuv is the engine behind Node.js that manages asynchronous operations using the event loop and thread pool.
Node.js = JavaScript runtime
libuv = Async operation manager


Thread Pool in libuv
Default size = 4 threads
Used for:
File system
Crypto
DNS lookup
Some compression tasks

You can increase:
UV_THREADPOOL_SIZE=8 node app.js


🌀 libuv & Event Loop

The Event Loop is implemented by libuv.

Node.js event loop phases:

Timers
Pending callbacks
Idle/prepare
Poll
Check
Close callbacks



| Feature         | V8                 | libuv                   |
| --------------- | ------------------ | ----------------------- |
| Purpose         | Execute JS         | Handle async I/O        |
| Written In      | C++                | C                       |
| Handles         | Call Stack         | Event Loop              |
| Thread          | Single main thread | Thread pool (4 default) |
| Responsible For | JS execution       | Non-blocking behavior   |



🎯 Architect-Level Summary Answer

V8 is the JavaScript engine responsible for parsing, compiling, optimizing, and executing JavaScript code with its own heap and garbage collector.
libuv is a cross-platform asynchronous I/O library written in C that implements Node.js’s event loop, thread pool, and OS-level async abstractions.
V8 handles computation; libuv handles orchestration of asynchronous operations.


*/



/*
🌀 Node.js Event Loop (Implemented by libuv)
Node.js event loop has 6 main phases:

1. Timers
2. Pending Callbacks
3. Idle / Prepare
4. Poll
5. Check
6. Close Callbacks

After every phase:
👉 Microtasks queue runs
process.nextTick
Promise.then


| Phase        | Executes                |
| ------------ | ----------------------- |
| Timers       | setTimeout, setInterval |
| Pending      | System I/O callbacks    |
| Idle/Prepare | Internal                |
| Poll         | fs, http, DB callbacks  |
| Check        | setImmediate            |
| Close        | socket.on('close')      |


*/

/*

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
process.nextTick(() => console.log("D"));
console.log("E");




setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));

👉 Not guaranteed order
⚠ Depends on system timing.



const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => console.log("Timeout"), 0);
  setImmediate(() => console.log("Immediate"));
});


Immediate
Timeout

🔎 Why?

Inside Poll phase:

After I/O callback
Event loop goes to Check phase first ( has check phase is second last and after poll and then next loop will go for timer phase)
setImmediate runs before Timers



🧠 Question 4 — Nested nextTick

process.nextTick(() => {
  console.log("A");
  process.nextTick(() => console.log("B"));
});

Promise.resolve().then(() => console.log("C"));

A
B
C

Why?
Node drains entire nextTick queue before moving to Promise microtask queue.
⚠ This can starve the event loop if abused.


🧠 Question 5 — Promise inside Timer

setTimeout(() => {
  console.log("Timeout");

  Promise.resolve().then(() => {
    console.log("Promise inside Timeout");
  });

}, 0);

Timeout
Promise inside Timeout

🔎 Why?
After Timer phase:
Microtasks queue executes immediately.


🧠 Question 6 — Multiple Timers + Microtasks

setTimeout(() => console.log("T1"), 0);

setTimeout(() => {
  console.log("T2");
  Promise.resolve().then(() => console.log("P2"));
}, 0);

Promise.resolve().then(() => console.log("P1"));

P1
T1
T2
P2

🔎 Order:

1️⃣ Sync done
2️⃣ Microtasks → P1
3️⃣ Timer T1
4️⃣ Timer T2
5️⃣ Microtasks after T2 → P2


🧠 Question 7 — nextTick Starvation
let count = 0;

function loop() {
  if (count < 5) {
    count++;
    process.nextTick(loop);
  }
  console.log("Loop", count);
}

loop();

setTimeout(() => console.log("Timeout"), 0);

Loop 1
Loop 2
Loop 3
Loop 4
Loop 5
Timeout

Entire nextTick queue finishes before moving to Timer phase.

If this were infinite → Timer never runs.


🧠 Question 8 — Mixed Everything
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => {
  console.log("Promise");
  process.nextTick(() => console.log("NextTick inside Promise"));
});

process.nextTick(() => console.log("NextTick"));

console.log("End");


Start
End
NextTick
Promise
NextTick inside Promise
Timeout or Immediate (depends)

Explanation:

1️⃣ Sync → Start
2️⃣ Sync → End
3️⃣ nextTick → NextTick
4️⃣ Promise → Promise
5️⃣ nextTick inside Promise → NextTick inside Promise
6️⃣ setTimeout vs setImmediate → depends (top-level race)


Explanation:

1️⃣ Sync → Start
2️⃣ Sync → End
3️⃣ nextTick → NextTick
4️⃣ Promise → Promise
5️⃣ nextTick inside Promise → NextTick inside Promise
6️⃣ setTimeout vs setImmediate → depends (top-level race)


🎯 Senior-Level Final Line

process.nextTick has higher priority than Promises.
Microtasks execute after every phase.
setImmediate executes in Check phase.
Order between setTimeout(0) and setImmediate is deterministic only inside I/O callbacks.


Hard Question

💀 Question 1 — nextTick vs Promise Inside Promise

Promise.resolve().then(() => {
  console.log("P1");

  process.nextTick(() => {
    console.log("NT1");
  });

  Promise.resolve().then(() => {
    console.log("P2");
  });
});

process.nextTick(() => {
  console.log("NT2");
});

NT2
P1
P2
NT1


💀 Question 2 — Recursive Promise vs nextTick Starvation
let count = 0;

function promiseLoop() {
  if (count < 3) {
    count++;
    Promise.resolve().then(promiseLoop);
  }
  console.log("Promise", count);
}

function tickLoop() {
  if (count < 3) {
    count++;
    process.nextTick(tickLoop);
  }
  console.log("Tick", count);
}

promiseLoop();
tickLoop();

Promise 1
Tick 2
Tick 3
Tick 3
Promise 3
Promise 3
Promise 3


🔥 Why This Is Brutal

process.nextTick starves the Promise queue.

Node drains entire nextTick queue before returning to Promise microtasks.

So:

tickLoop dominates

promiseLoop callbacks get delayed



💀 Question 3 — setImmediate Inside Timer Inside I/O
const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("I/O");

  setTimeout(() => {
    console.log("Timer");

    setImmediate(() => {
      console.log("Immediate inside Timer");
    });

  }, 0);

  setImmediate(() => {
    console.log("Immediate");
  });
});


I/O
Immediate
Timer
Immediate inside Timer

🔥 Why?

Inside I/O (Poll phase):

After callback:
→ goes to Check phase first
→ runs Immediate

Then next loop:
→ Timers phase
→ runs Timer

Inside Timer:
→ schedules setImmediate
→ which runs in next Check phase


💀 Question 4 — Async/Await Hidden Microtasks

async function test() {
  console.log("A");

  await null;

  console.log("B");
}

console.log("C");

test();

console.log("D");

C
A
D
B

🔥 Why?

await is basically:

Promise.resolve(null).then(...)


So:

1️⃣ C
2️⃣ A
3️⃣ D
4️⃣ Microtask → B



💀 Question 5 — The Brutal One

console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");

  Promise.resolve().then(() => {
    console.log("Promise inside Timeout");
  });

}, 0);

setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("NextTick");
});

Promise.resolve().then(() => {
  console.log("Promise 1");
});

console.log("End");

Start
End
NextTick
Promise 1
Timeout 1 OR Immediate (depends on environment)
Promise inside Timeout (if Timeout ran first)


🔥 Important

Outside I/O:

setTimeout vs setImmediate → non-deterministic.

Inside I/O → deterministic.

That subtle distinction destroys candidates.



🧠 Final Boss Level Rule Set

To survive these questions, remember:

🥇 Order of Execution

1. Synchronous code
2. process.nextTick
3. Promise microtasks
4. Timers
5. I/O (Poll)
6. setImmediate
7. Close callbacks

🎯 15+ Years Architect-Level One-Liner
Node.js event loop scheduling is a cooperation between libuv’s macrotask phases and V8’s microtask queue, where process.nextTick has priority over Promise microtasks and can starve I/O if abused.
*/