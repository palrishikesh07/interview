// 🧠 Easy memory:
// Proxy = Control
// Reflect = Actual operation
// Proxy intercepts object operations.Reflect performs the default behavior.

/**
 * Proxy: In essence, a Proxy object is a wrapper around another object, often called the target. 
 */

/**
 * Reflect: The Bridge to Default Operations
*the actual operation to the target object. Using Reflect ensures we do this consistently and correctly, especially in inheritance scenarios.
 */

const p1 = {
    fname: 'Hrishikesh',
    name: "Pal",
    age: 18
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
                if (age <= 0) throw new Error(`${prop} must be > Zero`)
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
// p1Proxy.age = -10; // Error: age must be > Zero



