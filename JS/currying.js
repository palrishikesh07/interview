//Currying is a technique where a function takes arguments one at a time and returns a new function until all arguments are provided.

// Normal
function add(a, b, c) {
    return a + b + c;
}

add(1, 2, 3); // 6

// Currying function

function addCurrying(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

console.log(addCurrying(10)(20)(30))


// 1️⃣ Partial Application(Very Important for Interviews)

const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5))
console.log(triple(5))

// 2️⃣ Reusable Utility Functions
const formatCurrency = currency => amount => `${currency} ${amount}`

const inrFormat = formatCurrency("Inr:")
const usdFormat = formatCurrency("$:")
console.log(inrFormat("1000"))
console.log(usdFormat("50"))


// 4️⃣ Configuration-Based Functions

const logger = level => message => {
    console.log(`[${level}] ${message}`)
}

const errorLogger = logger("ERROR");
const infoLogger = logger("INFO");

errorLogger("Something went wrong")
infoLogger("App started")




function infiniteSum(a) {

    return function (b) {
        if (b !== undefined) {
            return infiniteSum(a + b);
        }

        return a;
    };
}

console.log(infiniteSum(1)(2)(3)(4)()); // 10


function curry(fn) {
    return function curried(...args) {
        // Check if we have received enough arguments
        if (args.length >= fn.length) {
            // If yes, execute the original function
            return fn.apply(this, args);
        } else {
            // If no, return a new function that waits for more arguments
            return function (...nextArgs) {
                console.log(args, ' ', ...nextArgs)

                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// 1. Define a standard function
const totalSum = (a, b, c) => a + b + c;

// 2. Transform it using our curry utility
const sum = curry(totalSum);

// 3. Both ways now work!
// console.log(sum(1, 2, 3));    // 6
console.log(sum(1)(2)(3));    // 6
// console.log(sum(1)(2, 3));    // 6











