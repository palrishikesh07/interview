function createCounter() {
    let count = 0;
    return function () {
        count++;
        console.log('Counter: ', count);
    }
}

const count = createCounter();
count()
count()
count()


function greetUser(name) {
    console.log(`Hello ${name}!`);
}

function execFun(func, arg) {
    func(arg)
}

execFun(greetUser, 'Hrishikesh')


const maxInt = Number.MAX_SAFE_INTEGER
const a = BigInt(10) + BigInt(maxInt);
console.log(a);

console.log("type of maxInt: ", typeof maxInt);
console.log("type of a: ", typeof a);
console.log("type of custom: ", typeof 10n);

const user = { name: 'Alice', age: 25 };
for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}


const person = {
    name: 'Alice',
    // greet: () => console.log(`Hello, ${this.name || 'Guest'}`), // Output: Hello, Guest
    // greet() {
    //     console.log(`Hello, ${this.name || 'Guest'}`) // Output: Hello, Alice
    // },
    greet: function () {
        const greetCall = () => {
            console.log(`Hello, ${this.name || 'Guest'}`) // Output: Hello, Alice
        }
        greetCall();
    }
};
person.greet(); // Output: Hello, Guest

