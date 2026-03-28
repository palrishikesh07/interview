const obj1 = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj1 }; // Shallow copy
const deepCopy = JSON.parse(JSON.stringify(obj1)); // Deep copy
shallowCopy.b.c = 42;
console.log(obj1.b.c); // Output: 42 (shallow copy affected original)
deepCopy.b.c = 100;
console.log(obj1.b.c); // Output: 42 (deep copy is independent)


function counter() {
    let count = 0;
    return function increment() {
        console.log(count);
        count += 1;
    }
}

const count = counter();
count();
count();
count();


// let countInterval = 0;
// const interval = setInterval(() => {
//     console.log("Interval :", countInterval);
//     countInterval++;
//     if (countInterval == 3) clearInterval(interval);
// }, 2000);


const callAPI = () => {
    console.log("Calling API");
}

// callAPI()
// callAPI()
// callAPI()

const debouncing = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            return func(...args)
        }, delay);
    }
}

const debouncingAPI = debouncing(callAPI, 1000)

// debouncingAPI()
// debouncingAPI()
// debouncingAPI()


const person = {
    name: "Alice Bhai",
    greet: function (age) {
        console.log(`Humara name ${this.name} aur age hai: ${age}`);
    }
}


const anotherPerson = {
    name: "Boby",
}

person.greet.call(anotherPerson, 20);
person.greet.apply(anotherPerson, [20]);

const greetBound = person.greet.bind(anotherPerson, 21)
greetBound();



const douleValue = (x) => x * 2;

const numbers = [1, 2, 3, 4, 5];
// map: doubles each element
// const doubleMapValue = numbers.map(douleValue);
// console.log("doubleMapValue: ", doubleMapValue);


// filter: keeps even numbers
const eventNumber = (x) => x % 2 === 0;
const eventNumberFilter = numbers.filter(eventNumber);
console.log("eventNumberFilter: ", eventNumberFilter);

// reduce: calculates the sum
const sumReducer = numbers.reduce((acc, n) => {
    return acc + n;
}, 0)
console.log("sumReducer: ", sumReducer);

//

const personObj = {
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const alice = Object.create(personObj);
alice.name = 'Alice Bhai';
alice.greet();

console.log(alice.__proto__ === personObj); // True


const obj = { a: 1, b: 2 };

Object.freeze(obj);
obj.new = 'new'; // Not allowed
obj.a = 10; // Not allowed
delete obj.b; // Not allowed
console.log("Freeze: ", obj);

const objSeal = { a: 1, b: 2 };

Object.seal(objSeal);
objSeal.a = 10; //allowed
objSeal.new = 'new'; // Not allowed
delete objSeal.b; // Not allowed
console.log("Seal: ", objSeal);


function* generatorFunc() {
    yield 1;
    yield 2;
    yield 3;
    yield 'Completed !';
}

const gen = generatorFunc();
console.log('Gen1: ', gen.next());
console.log('Gen2: ', gen.next().value);
console.log('Gen3: ', gen.next().value);
console.log('Gen4: ', gen.next()); //  { value: 'Completed !', done: false }, last value
console.log('Gen5: ', gen.next()); // { value: undefined, done: true }
console.log('Gen6: ', gen.next()); // { value: undefined, done: true }

const sym1 = Symbol("id")
const sym2 = Symbol("id")

console.log(sym1 == sym2); // false
console.log(sym1 === sym2); // false

const objSymbole = {
    [sym1]: "Value associated with sym1"
}

console.log(objSymbole[sym1]);

console.log(typeof null); // Output: "object" (quirk in JavaScript)
console.log(typeof []); // Output: "object"
console.log(typeof undefined); // Output: "undefined"

// <div id="parent"><button>Click me</button></div>
// document.getElementById('parent').addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//         console.log('Button Clicked: ', event.target.textContent)
//     }
// })

let ObjWeak = { name: 'Alice' };
const weakMap = new WeakMap();
weakMap.set(ObjWeak, 'Developer');
console.log("WeakMap: ", weakMap.get(ObjWeak));

const weakSet = new WeakSet();
weakSet.add(ObjWeak);
console.log(weakSet.has(ObjWeak)); // true





