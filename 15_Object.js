// Optional chaining

const user = {
    name: "Rishi",
    address: {
        // city:"Delhi",
    }
};

console.log(user?.address?.city); // Optinal chaining
console.log(user?.address?.city ?? "City is not present"); // Nullish Coalescing


// Nullish Coalescing (??)  only checks for
null
undefined

// OR (||)  if the left side is falsy.
false
0
    - 0
0n
""
null
undefined
NaN

let a = 10;
let b = 20;
console.log(`Before a=${a} b=${b}`)

a = a + b; // 30
b = a - b; // 10;
a = a - b; // 20

// [b,a] = [a,b]
console.log(`After a= ${a} b=${b}`)


let obj1 = { a: 10, b: 20, c: 30, d: 40 };
let obj2 = { d: 49, e: 50, f: 60 };

let obj3 = {};

let count = 0;

for (let item in obj1) {

    if (!obj3[item]) {
        count++;

    }
    
    obj3[item] = obj1[item];
}

for (let item in obj2) {

    if (!obj3[item]) {
        count++;
    }

    obj3[item] = obj2[item];
}

// console.log(obj3);
// console.log(count);


const obj= {
    name:"JS",
    show:function(){
        console.log(this.name);
    }
}

obj.show() // JS

const fn = obj.show;
fn(); // undefined
fn.bind(obj)(); // JS


