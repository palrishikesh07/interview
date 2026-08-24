/*

Q. What is function composition?

Composition means building complex functionality by combining small, independent functions/objects 
instead of creating one large function/class.

Function composition combines two or more functions so that the output of one becomes the input of the next.
*/



function add(a) {
    return a + 10;
}

function multiply(a) {
    return a * 2;
}

function square(a) {
    return a * a;
}

// Baisc compose

const result = square(multiply(add(5)));
console.log(result)

//compose() Function

function compose(f, g) {
    return function (value) {
        return f(g(value));
    }
}
const add10 = (x) => x + 10;
const multiply2 = (x) => x * 2;

const addThenMultiply = compose(multiply2, add10);  // usually executes right → left:

console.log(addThenMultiply(5)); // 20

// pipe() — Left to Right

function pipe(f, g) {
    return function (value) {
        return g(f(value));
    }
}

const process = pipe(add10, multiply2);
console.log(process(5)); // 30

// Composition with Multiple Functions

function pipeMultiple(...f) {
    return (value) => {
        return f.reduce((result, fn) => {
            return fn(result);
        }, value);
    }
}

const add11 = (x) => x + 11;
const multiply3 = (x) => x * 3;
const squarePipe = (x) => x * x;

const processResult = pipeMultiple(add11, multiply3, squarePipe);

console.log("processResult: ", processResult(5, 10));

// Composition with Multiple Functions and Arguments
function pipeMultipleArgs(...fns) {
    return (...value)=>{
        return fns.reduce((result,fn) => {
            return fn(result);
        },value)
    }
}


const add12 = (a, b) => a + b;
const multiply4 = (x) => x * 3;
const squareArgument = (x) => x * x;

const composeAll = (...fns)=>(...value) => fns.reduce((a,b)=>b(a),values);


const processResultArgument = pipeMultipleArgs(add, multiply3, squarePipe);
console.log("processResultArgument:", processResultArgument(5, 1));
console.log("composeAllResult:", composeAll(add12,multiply4,squareArgument,function(value){
    return value;
}));
















//

const trim = str => str.trim();

const lowercase = str => str.toLowerCase();

const removeSpaces = str =>
    str.replace(/\s+/g, "-");

const pipeFn = (...fns) => value =>
    fns.reduce((result, fn) => fn(result), value);

const createUsername = pipeFn(
    trim,
    lowercase,
    removeSpaces
);

console.log(
    createUsername("  Raj Kumar  ")
);