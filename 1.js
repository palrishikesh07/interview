
function example() {
    var x = 10;
    if (true) {
         var x = 20; // re-declares x (if let x = 20, then output will be 10 out of scope)
        console.log(x); // Output: 20
    }
    console.log(x); // Output: 20
}

example();
console.log(".......Example")
let y = 10;
if (true) {
    let y = 20; // Creates a new y within this block
    console.log(y); // Output: 20
}
console.log(y); // Output: 10
const z = 30;
// z = 40; // Error: Assignment to constant variable

let a = "Hello"; // String
let b = 42; // Number
let c = true; // Boolean
let d = null; // Null
let e; // Undefined
let f = Symbol('unique'); // Symbol
let g = 9007199254740991n; // BigInt
let h = { name: "Alice" }; // Object
console.log(typeof a, typeof b, typeof typeof c);



x=5;
x=x*2+1;
console.log(x)
x=x/3;
console.log(x); // Output: 3