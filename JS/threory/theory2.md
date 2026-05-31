## 
```js
11. What is a function in JavaScript?  
A function is a reusable block of code designed to perform a specific task.

Why Functions Are Important:  
- Reuse code  
- Improve readability  
- Reduce duplication  
- Make programs modular  

Syntax:
function greet() {
    console.log("Hello");
}
Calling a Function: greet();

Function With Parameters:
function greet(name) {
    console.log("Hello " + name);
}

greet("Deepak");

12. What is a function declaration vs expression?  

Function Declaration  
Defined using the function keyword with a name.
function add(a, b) {
    return a + b;
}

Function Expression  
Function stored inside a variable.
const add = function(a, b) {
    return a + b;
};

Feature Comparison:  
Hoisted → Declaration(normal): Yes,  Expression(arrow): No  
Named   → Declaration(normal): Usually, Expression(arrow): Can be anonymous  

Key Point:  
Function declarations can be called before they are defined because of hoisting.

13. What is an arrow function?  
Arrow functions are a shorter syntax for writing functions introduced in ES6.

Syntax:
const greet = () => {
    console.log("Hello");
};

Example With Parameters:
const add = (a, b) => a + b;
console.log(add(2, 3));

Benefits:  
- Shorter syntax  
- Cleaner code  
- No own this binding  

Important:  
Arrow functions should not be used as object methods when this is required.

14. What is hoisting?  
Hoisting is JavaScript’s behavior of moving declarations to the top of the scope before execution.

Example:
console.log(a);
var a = 10;

Internally:
var a;
console.log(a);
a = 10;

Output: undefined

Important Points:  
- var is hoisted and initialized as undefined  
- let and const are hoisted but stay in the Temporal Dead Zone (TDZ)  

Function Hoisting:
sayHello();

function sayHello() {
    console.log("Hello");
}

15. What is a closure?  
A closure is created when an inner function remembers variables from its outer function even after the outer function has finished execution.

Example:
function outer() {
    let count = 0;

    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();

counter(); // 1
counter(); // 2

Why Closures Are Useful:  
- Data privacy  
- Maintaining state  
- Callbacks  
- Memoization  

Interview Definition:  
A closure gives a function access to its outer scope even after the outer function is executed.

16. What is the module pattern?  
The module pattern is used to create private and public variables/functions using closures.

Example:
const Counter = (function() {

    let count = 0;

    return {
        increment: function() {
            count++;
            console.log(count);
        },

        decrement: function() {
            count--;
            console.log(count);
        }
    };

})();

Counter.increment();
Counter.increment();

Benefits:  
- Encapsulation  
- Data hiding  
- Avoids global scope pollution  

17. What is IIFE?  
IIFE stands for:  
Immediately Invoked Function Expression  

It runs immediately after being created.

Syntax:
(function() {
    console.log("IIFE Executed");
})();

Arrow Function IIFE:
(() => {
    console.log("Hello");
})();

Why Use IIFE?  
- Avoid global variables  
- Create private scope  
- Execute code instantly  

18. What is the difference between function parameters and arguments?  
Parameters → Variables in function definition  
Arguments → Actual values passed to function  

Example:
function greet(name) { // Parameter
    console.log(name);
}

greet("Deepak"); // Argument

Key Point:  
- Parameters receive values  
- Arguments send values  

19. What is a default parameter?  
Default parameters allow functions to use a default value if no argument is passed.

Example:
function greet(name = "Guest") {
    console.log("Hello " + name);
}

greet();
greet("Deepak");

Output:
Hello Guest
Hello Deepak

Benefit:  
Prevents undefined values.

20. How do optional / rest parameters (...args) work?  
Rest parameters collect multiple arguments into a single array.

Syntax:
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));
Output: 10

Benefits:  
- Accept unlimited arguments  
- Cleaner function handling  

Difference Between Spread and Rest:  
Spread (...) → Expand values  
Rest (...)   → Collect values  


Spread Example:
const nums = [1, 2, 3];
console.log(...nums);
```

