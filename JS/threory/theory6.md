## JS/threory/theory1.js
```js

51. What is the call stack and callback queue?

Call Stack
The call stack is a data structure that keeps track of function execution in JavaScript.

JavaScript executes one task at a time using the stack.

Example:
function first() {
    second();
}

function second() {
    console.log("Hello");
}

first();

Execution Order:
1. first() added to stack
2. second() added
3. console.log() runs
4. Functions removed after execution

Callback Queue
Stores asynchronous callback functions before they move to the call stack.

Example:
setTimeout(() => {
    console.log("Async");
}, 1000);

The callback waits in the queue until the stack becomes empty.

52. What is the event loop?
The event loop continuously checks:
1. Is the call stack empty?
2. If yes → move tasks from callback queue to stack.

It allows JavaScript to handle asynchronous operations despite being single-threaded.

Example:
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");

Output:
Start
End
Timeout

Why?
Because setTimeout callback enters the queue and waits for the stack to clear.

53. What is asynchronous programming?
Asynchronous programming allows tasks to run without blocking the main thread.

Synchronous Example:
console.log("A");
console.log("B");
console.log("C");
Runs one after another.

Asynchronous Example:
console.log("Start");

setTimeout(() => {
    console.log("Async Task");
}, 2000);

console.log("End");

Output:
Start
End
Async Task

Common Async Operations:
- API requests
- Timers
- File handling
- Database calls

54. What is a callback function?
A callback is a function passed into another function and executed later.

Example:
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function done() {
    console.log("Completed");
}

greet("Deepak", done);

Output:
Hello Deepak
Completed

Common Uses:
- Async operations
- Event handling
- Timers

55. What is the “callback hell” problem?
Callback hell happens when multiple nested callbacks make code difficult to read and maintain.

Example:
getUser(function(user) {
    getOrders(user, function(orders) {
        getPayment(orders, function(payment) {
            console.log(payment);
        });
    });
});

Problems:
- Hard to read
- Difficult debugging
- Poor maintainability

Solution:
- Promises
- async/await

56. What is a Promise?
A Promise is an object representing the eventual completion or failure of an asynchronous operation.

Promise States:
- Pending: Initial state
- Fulfilled: Operation successful
- Rejected: Operation failed

Example:
const promise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("Done");
    } else {
        reject("Failed");
    }
});

promise.then(result => {
    console.log(result);
});

57. What is Promise.then() and Promise.catch()?

.then()
Handles successful result.

.catch()
Handles errors.

Example:
fetch("https://api.example.com/data")
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
});

Promise Chaining
Multiple .then() methods can be chained together.

58. What is Promise.all() and Promise.race()?

Promise.all()
Waits for all promises to complete.
Promise.all([promise1, promise2])
.then(results => {
    console.log(results);
});

Important: If one promise fails → entire Promise.all fails.

Q. Promise.all()
- Waits for all promises to succeed.
- If one fails, whole promise fails immediately.
- Promise.all is fail-fast. If any promise rejects, entire operation rejects.

Q. Promise.allSettled()
- Waits for all promises to complete, regardless of - - success/failure.
- Never throws error.
- Promise.allSettled never fails and gives result of every promise.

Q. Promise.any()
- Returns first successful promise (ignore rejected).
- Ignores rejected promises.
- Fails only if ALL fail.
- Promise.any returns first fulfilled promise and ignores failures.

Q. Promise.race()
- Returns whichever promise finishes first.
- Can be success OR failure.
- Promise.race returns first settled promise, either resolved or rejected.

59. What is async/await?
async/await is modern syntax for handling asynchronous code more cleanly.

Example:
async function fetchData() {
    const response = await fetch("https://api.example.com");
    const data = await response.json();
    console.log(data);
}

Important:
- async makes function return a Promise
- await pauses execution until Promise resolves

Benefits:
- Cleaner syntax
- Easier debugging
- Avoids callback hell

60. How do you handle errors in async/await?
Using try/catch.

Example:
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com");
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log("Error:", error);
    }
}

Why Use try/catch?
To prevent application crashes and handle async failures properly.

Best Practice:
Always handle errors in async operations.
```

