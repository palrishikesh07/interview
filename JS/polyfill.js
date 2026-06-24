// Polyfill in JavaScript is a piece of code that provides modern functionality on older browsers that do not natively support it.

// How It Works: A polyfill typically checks if a feature exists(if (!Feature.prototype.method)), and if not, it defines the missing functionality using existing JavaScript capabilities.


// Includes Polyfill
if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchTerm) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === searchTerm) return true;
        }
        return false;
    }
}





//map Polyfill 

Array.prototype.myMap = function (cb) {
    let temp = [];
    console.log("this: ", this);
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i]))
    }
    return temp;
}

const arr = [1, 2, 3, 4, 5];
// const myMapSolution = arr.myMap((n) => n * n);
// console.log("myMapSolution:  ",myMapSolution)

Array.prototype.myMap = function (cd) {
    let temp1 = [];
    let length = this.length;
    for (let i = 0; i < length; i++) {
        temp1.push(cd(this[i])); // This is important
    }
    return temp1;
}
const arr2 = [1, 2, 3, 4, 5, 100];
const result2 = arr2.myMap((n) => n * n);
console.log("result2", result2);


// Filter Polyfill
Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        // console.log("cb(this[i], i, this): ", this[i], i, this); // Invidual value, index, all array
        // console.log("cb(this[i], i, this): ", cb(this[i], i, this)); // Give true of false 
        if (cb(this[i], i, this)) {
            temp.push(this[i]);
        }
    }
    return temp;
};

arr.myFilter((n) => n > 2);

// Reduce Polyfill
Array.prototype.myReducer = function (cb, initialValue) {
    var accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }
    return accumulator;
};
let reducerArray = [1, 2, 3, 4, 5];
let aReducer = reducerArray.myReducer((acc, curr) => acc + curr, 0);
console.log("aReducer", aReducer);


console.log(1 + "1") // 11
console.log("1" + 1); // 11
console.log(1 - "1") // 0
console.log("1" - 1); // 0
console.log(1 + true) // 2
console.log(1 + false) // 1
console.log(1 + null) // 1
console.log(1 + undefined) // NaN   


console.log("----------------------- Call, Apply, Bind -----------------------")


//Example without using call:

function show() {
    console.log(this.msg);
}

show(); // logs undefined

//Example using call:

const obj = { msg: "Called using call" };

show.call(obj); // Called using call


// Polyfill for call method
// Easy to understand and implement, but it does not handle edge cases such as when the context is null or undefined, or when the function is called with a different number of arguments than expected. It also does not handle the case where the function is called as a constructor (using new).
// Easy way to implement with apply method, but it may not be as efficient as the first approach, as it involves an additional function call to apply. It also does not handle edge cases such as when the context is null or undefined, or when the function is called with a different number of arguments than expected. Additionally, it does not handle the case where the function is called as a constructor (using new).
// Function.prototype.customCall = function (context, ...args) {
//     const result = this.apply(context, args);
//     return result;
// };


if (!Function.prototype.customCall) {
    Function.prototype.customCall = function (context, ...args) {
        // console.log("this in customCall: ", this); // [Function: show]
        // console.log("this in context: ", context); // { msg: 'Called using call' 
        // console.log("this in globalThis: ", globalThis); //  <ref *1> Object [global] {...
        context = context || globalThis;

        const key = Symbol(); // unique key to avoid conflict
        context[key] = this; // assign the function to the context, so that it can be called as a method, 'this' is the function to be called

        // console.log("context after adding function: ", context); // { msg: 'Called using call', [Symbol()]: [Function: show] }
        // Execute the function and capture the result
        const result = context[key](...args);
        console.log("result in customCall: ", result); // undefined, because in show function does not return anything
        // Delete the temporary property
        delete context[key];

        // Return the result of the function call
        return result;
    };
}

show.customCall(obj); // Called using myCall


// Polyfill for apply method
// Function.prototype.myApply = function(context, args) {
//     const result = this.call(context, ...args);
//     return result;
//   };


Function.prototype.customApply = function (context, args) {
    // If context is null or undefined, set it to global object
    context = context || globalThis;
    // Create a unique property on the context to avoid overwriting existing properties
    const key = Symbol();
    context[key] = this; // 'this' is the function to be called
    // Execute the function and capture the result
    const result = context[key](...(args || []));
    // Delete the temporary property
    delete context[key];
    // Return the result of the function call
    return result;
};


function sum(a, b) {
    return a + b;
}

console.log(sum.customApply(null, [2, 3])); // 5



Function.prototype.customBind = function (context, ...args) {
    // Save reference to the original function
    // this is the function in which we invoke my Bind
    // show.myBind();// this will point to show function
    const self = this;
    return function (...newArgs) {
        // Merge the arguments passed to bind with those passed to the new function
        return self.apply(context, [...args, ...newArgs]);
    };
};

const objBind = { name: "Rishi" };

function greet(city) {
    return this.name + " from " + city;
}

const boundFn = greet.customBind(objBind);
console.log(boundFn("Bangalore")); // Rishi from Bangalore context[key]


// Need to create custom entries

const obj1 = {
    "name": "raj",
    "age": "30"
}
//[["name","raj"],["age":"30"]]

const objArray = Object.entries(obj1);
// console.log(objArray)

Object.prototype.customEntries = function () {
    const inputObject = this;
    let tempArray = [];
    for (let key in inputObject) {
        console.log("key", this[key])
        if (inputObject.hasOwnProperty(key)) {
            tempArray.push([key, inputObject[key]])
        }
    }
    return tempArray;
}

const customEntries = obj1.customEntries()


console.log("customEntries: ", customEntries)