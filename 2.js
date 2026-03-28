let x = 10;
let y = 3;
console.log(x + y); // Output: 13
console.log(x - y); // Output: 7
console.log(x * y); // Output: 30
console.log(x / y); // Output: 3.333...
console.log(x % y); // Output: 1
console.log(x ** y); // Output: 1000
x++;
console.log(x); // Output: 11


console.log(5 == '5'); // Output: true (type coercion)
console.log(5 === '5'); // Output: false (different types)
console.log(true == 1); // Output: true (1 is considered true)
console.log(true === 1); // Output: false (different types)


let day = "Monday";
if (day === "Monday") {
    console.log("Start of the week");
}
else if (day === "Friday") {
    console.log("Almost Weekend");
}
else {
    console.log("Its a regular day");
}


// Using switch
switch (day) {
    case 'Monday':
        console.log("start of the week")
        break;
    case "Friday":
        console.log("Almost weekend");
        break;
    default:
        console.log("Its a regular day")
}

// Function Declaration
function greet() {
    console.log("Hello!");
}
greet(); // Output: Hello!
// Function Expressioncurrent
const greetExpression = function () {
    console.log("Hello from expression!");
};
greetExpression(); // Output: Hello from expression!



const add = (a, b) => a + b;
console.log(add(2, 4));

const greetArrowFunction = name => console.log(`Hello, ${name}`);
greetArrowFunction('Hrishikesh')




function outerFunctoin(outerVariable) {
    return function innerFunction(innverVariable) {
        console.log(`Outer: ${outerVariable}, Inner: ${innverVariable}`)
    }
}

const closure = outerFunctoin('Outside')
closure('Inner')

const obj = { a: 1, b: 2 };
for (let key in obj) {
    console.log(key); // Output: a, b
}
const arr = [10, 20, 30];
for (let value of arr) {
    console.log(value); // Output: 10, 20, 30
}


// HOF

const square = (x) => x * x;
const applyFunctoin = (x, fn) => fn(x);
console.log("HOF: ", applyFunctoin(5, square))


let variableUndefined;
let variableNull = null;
console.log("Type of undefined variable:", typeof variableUndefined);
console.log("Type of null variable:", typeof variableNull);


function greetCallback(name, callback) {
    console.log(`Hello, ${name}`)
    // console.log(`Hello, ${name}, CB: ${callback}`)
    setTimeout(() => {
        callback(name)
    }, 3000);
}

function afterGreet(name = 'Hi') {
    console.log(`This message run after greet, e.g ${name} please have a juice`);
}

greetCallback('Rishi', afterGreet)



let globalVar = "Global"; // Global scope
function demoScope() {
    let funcVar = "Function Scope"; // Function scope
    console.log(globalVar); // Output: Global
}
// console.log(funcVar); // Error: funcVar is not defined
{
    let blockVar = "Block Scope"; // Block scope
    console.log(blockVar); // Output: Block Scope
}
// console.log(blockVar); // Error: blockVar is not defined

console.log(x1); // Output: undefined (hoisted declaration)
var x1 = 5;
// console.log(y1); // Error: Cannot access 'y' before initialization
let y1 = 10;




(function () {
    let count = 0;
    console.log('Count is ', count);

})()



const person = {
    name: "Alice",
    inside: {
        greet: function () {
            console.log(`Hello. ${this.name}`) // undefined
        }
    },
    greet: function () {
        console.log(`Hello. ${this.name}`) // Alice
    }
}

person.greet()
person.inside.greet()

const numbers = [1, 2, 3, 4];

const double = x => x * 2;

const doubleValue = numbers.map(double);
console.log("HOF Map: ", doubleValue);

// Custom higher-order function example
const applyFunction = (x, func) => func(x);

console.log("Apply: ", applyFunction(9, double));

console.log('Start');
setTimeout(() => console.log('Timeout'), 0); // Goes to task queue
Promise.resolve().then(() => console.log('Promise')); // Goes to microtask queue
console.log('End');
// Output: Start, End, Promise, Timeout


const mPromise = new Promise((resvole, reject) => {
    let success = 1;
    if (success) {
        resvole("Sucess")
    }
    else {
        reject("failed");
    }
})

mPromise.catch((data) => {
    console.log("Success Data: ", data);
}).catch((e) => {
    console.log("Error ", e);
}).finally(() => {
    console.log("Promise is completed...");

})