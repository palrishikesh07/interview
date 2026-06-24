// 🧠 Easy memory:
// Proxy = Control
// Reflect = Actual operation
// Proxy intercepts object operations.
// Reflect performs the default behavior.

/**
 * Proxy wraps an object and intercepts fundamental operations (get, set, delete, apply, etc.)  vian 'traps'. Used for validation, logging, reactivity systems (Vue 3), mocking.
 * Proxy: In essence, a Proxy object is a wrapper around another object, often called the target. 
 */

/**
 * Reflect: The Bridge to Default Operations
*the actual operation to the target object. Using Reflect ensures we do this consistently and correctly, especially in inheritance scenarios.
 */

const p1 = {
    fname: 'Rishikesh',
    lname: "Pal",
    age: 0
}
// p1.age = -10; // Here we are changing the irrelevant value

const p1Proxy = new Proxy(p1, {
    get(target, prop) {
        if (prop in target) return target[prop];
        return false;
    },
    set(target, prop, value) {
        if (!(prop in target)) throw new Error(`${prop} does not exists`);

        switch (prop) {
            case 'fname':
            case 'lname':
                if (typeof value !== 'string') throw new Error(`${prop} must be string`)
                break;
            case 'age':
                if (typeof value !== 'number') throw new Error(`${prop} must be Number`)
                if (value <= 0) throw new Error(`${prop} must be > Zero`)
        }
        //  Set value mannually
        //  target[prop] = value;
        // Set value by Reflect
        Reflect.set(target, prop, value);
    }
})

console.log(p1);
console.log(p1Proxy.age);
p1Proxy.lname = "NewLastName"; // Error: lname does not exists
// p1Proxy.fname = 123; // Error: fname must be string
// p1Proxy.age = 0; // Error: age must be > Zero






const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    }, 
    set(target, prop, value) {
        if (typeof value !=='number') throw TypeError('Numbers only'); 
            target[prop] = value;
            return true;
    }
}; 
const obj = new Proxy({}, handler); 
obj.x = 42; // OK 
console.log(obj.x); // 42
console.log(obj.y); // Property y not found