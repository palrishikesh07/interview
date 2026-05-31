##
```js
71. What are try/catch/finally?  
These are used for error handling in JavaScript.

Block  
try  
- Purpose: Code that may cause error  

catch  
- Purpose: Handles the error  

finally  
- Purpose: Always executes  

Example:
try {
    console.log(a);
} catch(error) {
    console.log("Error occurred");
} finally {
    console.log("Execution completed");
}

Output:
Error occurred
Execution completed

Important:  
finally runs whether an error occurs or not.

72. What is the Error object?  
The Error object contains information about runtime errors.

Example:
try {
    throw new Error("Something went wrong");
} catch(error) {
    console.log(error.message);
}

Common Error Properties:  

name  
- Description: Error type  

message  
- Description: Error message  

stack  
- Description: Stack trace  

Built-in Error Types:  
- ReferenceError  
- TypeError  
- SyntaxError  
- RangeError  

73. How do you create custom errors?  
Using classes or extending Error.

Example:
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

throw new ValidationError("Invalid input");

Benefits:  
- Better debugging  
- More meaningful error handling  

74. What are console.log, console.table, console.group?  
These are debugging methods available in browser DevTools.

console.log()  
Prints normal output.
console.log("Hello");
console.table()  
Displays data in table format.
console.table([
    {name: "Deepak", age: 25},
    {name: "John", age: 30}
]);

console.group()  
Groups related logs.
console.group("User Info");
console.log("Name: Deepak");
console.log("Age: 25");
console.groupEnd();

Benefit:  
Cleaner debugging in large applications.

75. How do you use breakpoints and the debugger?  
Breakpoints pause code execution for debugging.

Using debugger
function test() {
    let x = 10;
    debugger;
    console.log(x);
}
test();

How It Works:  
- Browser pauses at debugger  
- Inspect variables and execution flow  

Browser DevTools Features:  
- Step through code  
- Watch variables  
- Inspect call stack  
- Monitor network requests  

Interview Tip:  
Very important skill for frontend developers.

76. What is performance profiling in DevTools?  
Performance profiling helps identify slow operations and bottlenecks.

Browser DevTools Can Measure:  
- Rendering performance  
- JavaScript execution time  
- Memory usage  
- FPS drops  

Common Tabs:  
- Performance  
- Memory  
- Network  

Why It Matters:  
Helps optimize web applications and improve user experience.

77. How do you avoid blocking the main thread?  
Heavy tasks can freeze the UI because JavaScript is single-threaded.

Solutions:  
1. Use asynchronous operations  
2. Break heavy tasks into chunks  
3. Use Web Workers  
4. Use setTimeout()  
5. Optimize loops  

Example:
setTimeout(() => {
    heavyTask();
}, 0);

Why?  
Allows browser to handle UI updates before running heavy code.

78. What is debouncing vs throttling?  
Both optimize frequent function calls.

Debouncing  
Runs function only after user stops triggering event.

Example Use Cases:  
- Search input  
- Resize events
function debounce(fn, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}

Throttling  
Limits function execution to fixed intervals.

Example Use Cases:  
- Scroll events  
- Mouse movement
function throttle(fn, delay) {
    let lastCall = 0;
    return function() {
        let now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn();
        }
    };
}

Difference:  

Debounce  
- Waits after last event  
- Reduces extra calls  

Throttle  
- Executes at intervals  
- Limits execution frequency  

79. How do you optimize heavy loops or renders?  
Common Optimization Techniques:  
1. Avoid unnecessary DOM updates  
2. Use memoization  
3. Use efficient loops  
4. Cache repeated calculations  
5. Use virtual DOM frameworks  
6. Minimize reflows/repaints  

Example:  
Cache DOM selector:
const element = document.getElementById("box");
for(let i = 0; i < 1000; i++) {
    element.innerHTML = i;
}

Why?  
Repeated DOM lookups are expensive.

80. How do you handle memory leaks?  
Memory leaks happen when unused memory is not released.

Common Causes:  
- Unremoved event listeners  
- Global variables  
- Timers not cleared  
- Detached DOM elements  
- Closures holding unused references  

Example:
const interval = setInterval(() => {
    console.log("Running");
}, 1000);

clearInterval(interval);

Best Practices:  
- Remove listeners  
- Clear timers  
- Avoid unnecessary global variables  
- Nullify unused references  

DevTools:  
Browser memory profiling tools help detect leaks
```

