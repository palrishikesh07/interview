// Repaint vs Reflow (Browser)
// Repaint happens when only visual styles change, but layout stays same.
// Reflow happens when layout or size changes, and browser recalculates positions.

/*
// Repaint example - only color changes, no layout recalculation
const element = document.getElementById('myElement');
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Reflow example - changing dimensions triggers layout recalculation
element.style.width = '200px';
element.style.height = '100px';
element.style.margin = '10px';

// Reflow - accessing offsetHeight forces layout recalculation
const height = element.offsetHeight;
element.style.display = 'none'; // triggers reflow

*/

//Proxy vs Reflect

// 🧠 Easy memory:
// Proxy = Control
// Reflect = Actual operation
// Proxy intercepts object operations.
// Reflect performs the default behavior.
// Proxy example

const target = {
    message: 'Hello, World!'
};

const handler = {
    get: function (target, prop) {
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set: function (target, prop, value) {
        if (!(prop in target)) throw new Error(`Cannot set property '${prop}' on target object.`);
        //target[prop] = value; // Normal object store
        Reflect.set(target, prop, value); // Through Relfect
        return true; // Indicate success
    }
};

const proxy = new Proxy(target, handler);
proxy.message = "New Message will save"
console.log(proxy.message); // Output: Hello, World!
// console.log(proxy.nonExistent); // Output: Property does not exist
// proxy.newProperty = 'New Value'; // Output: Cannot set property 'newProperty' on target object.

// // Reflect example
const obj = {
    name: 'Alice'
};

console.log(Reflect.get(obj, 'name')); // Output: Alice
console.log(Reflect.has(obj, 'name')); // Output: true
console.log(Reflect.set(obj, 'name', 'Bob')); // Output: true, adding new value
console.log(Reflect.get(obj, 'name')); // Output: Bob




//Currying vs Generator
//Currying = Breaking Chocolate 🍫
// Generator = Pause Button



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

// Generator can pause execution and resume later.
// A generator function is a function that can pause and resume execution using yield, returning values one at a time.
// 🧠 How It Works Internally
// yield → pause
// .next() → resume





/** 

🟢 Normal Function = Independent Boy 👦
It has its own:
this
arguments

🔵 Arrow Function = Small Baby 👶
It borrows this from parent.
It doesn’t have own this.
🧠 Memory:
Arrow function doesn’t have its own this.

*/
