## JS/threory/theory1.js
```js
🚀 JavaScript Interview Questions with Answers — Part 1

🧠 1. What is JavaScript and what is it used for?  

JavaScript is a high-level, interpreted programming language mainly used to make websites interactive and dynamic. It runs inside the browser and can also run on servers using Node.js.

Common Uses of JavaScript:  
- Building interactive websites  
- Form validation  
- Animations and sliders  
- API calls and dynamic content  
- Web apps and mobile apps  
- Backend development with Node.js  
- Game development  

Example: console.log("Hello World");

2. What are the data types in JavaScript?  

JavaScript has two categories of data types:

Primitive Data Types  
1. String  
2. Number  
3. Boolean  
4. Undefined  
5. Null  
6. BigInt  
7. Symbol  

Reference Data Types  
1. Object  
2. Array  
3. Function  

Example:
let name = "Deepak";      // String
let age = 25;             // Number
let isActive = true;      // Boolean
let data = null;          // Null
let value;                // Undefined

3. What is the difference between null and undefined?

Feature     | null                      | undefined  
Meaning     | Intentional empty value   | Variable not assigned  
Type        | object                    | undefined  
Assigned by | Developer                 | JavaScript automatically  

Example:
let a = null;
let b;

console.log(a); // null
console.log(b); // undefined
Key Point:  
- null means “empty intentionally”  
- undefined means “value not assigned yet”  

4. What is the difference between == and ===?  

== (Loose Equality)  
- Compares values only  
- Performs type conversion (type coercion)  

=== (Strict Equality)  
- Compares both value and data type  
- No type conversion  

Example:
console.log(5 == "5");   // true
console.log(5 === "5");  // false

Interview Tip: Always prefer === because it gives more predictable results.

5. What are primitive vs reference types?  

Primitive Types  
Stored directly in memory (stack memory).  
Examples: String, Number, Boolean, Null, Undefined  

Reference Types  
Stored by reference (memory address,heap memory due to their dynamic).  
Examples: Objects, Arrays, Functions  

Example:
let a = 10;
let b = a;
b = 20;
console.log(a); // 10

Reference Example:
let obj1 = {name: "John"};
let obj2 = obj1;
obj2.name = "Mike";
console.log(obj1.name); // Mike

Key Difference:  
- Primitive → copied by value  
- Reference → copied by reference  

6. What is type coercion?  

Type coercion means JavaScript automatically converts one data type into another during operations or comparisons.

Example:
console.log("5" + 2); // "52"
console.log("5" - 2); // 3

Why?  
- + prefers string concatenation  
- - converts strings to numbers  

Types of Coercion:  
1. Implicit coercion (automatic)  
2. Explicit coercion (manual)  

Explicit Example: Number("10"); // 10 , String(123); // "123"

7. What is the difference between let, const, and var?

Feature     | var       | let   | const  
Scope       | Function  | Block | Block  
Reassign    | Yes       | Yes   | No  
Redeclare   | Yes       | No    | No  
Hoisted     | Yes       | Yes   | Yes

(let,const are in temporal dead zone)
Example:
var a = 10;
let b = 20;
const c = 30;

Key Points:  
- Use let for changing values  
- Use const for fixed values  
- Avoid var in modern JavaScript  

8. What is block-scope vs function-scope?  

Function Scope  
Accessible inside the entire function. var is function-scoped.

Block Scope  
Accessible only inside {} block. let and const are block-scoped.

Example:
function test() {
    if (true) {
        var a = 10;
        let b = 20;
    }
    console.log(a); // Works
    console.log(b); // Error
}

9. What is the difference between let and var?

Feature     | var       | let  
Scope       | Function  | Block  
Redeclare   | Allowed   | Not allowed  
Hoisting    | Yes       | Yes (TDZ applies)  

Example:
var x = 10;
var x = 20; // Allowed

let y = 10;
let y = 20; // Error

Important: let avoids many bugs caused by var.

10. How do you declare and use variables?  

Variables are used to store data.

Syntax:
let name = "Deepak";
const age = 25;

Rules:  
- Use meaningful names  
- Cannot start with numbers  
- Case-sensitive  

Example:
let city = "Jaipur";
console.log(city);

Best Practice:  
- Use const by default  
- Use let when value changes  
- Avoid var in modern development
```

