/**
 * Answer:
A singleton pattern ensures that only one instance of an object is created and provides a
global point of access to it.
 */


const SingleTon = (function () {
    let instance;
    function createInstance() {
        return { name: 'Hrishi SingleTon Instance' }
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();


const instance1 = SingleTon.getInstance();
const instance2 = SingleTon.getInstance();

console.log(typeof instance1)
console.log(typeof instance2)
console.log(instance1 == instance2);
console.log(instance1 === instance2);


function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
const obj1 = { a: 1, b: 2 };


function sum(a, b) {
    return a + b;
}

function memoize(fn) {
    const cache = {}
    return (...args) => {
        const key = JSON.stringify(...args);
        if (cache[key]) {
            console.log('Cache Data...');
            return cache[key];
        }
        else {
            console.log('Calcuate Data...');
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    }
}


const sumMemeo = memoize(sum)

// console.log('Sum is: ', sum(10, 20));

sumMemeo(10, 20)
sumMemeo(10, 20)
sumMemeo(10, 20)


// const myIterable = {
//     data: [1, 2, 3, 4],
//     [Symbol.iterator]() {
//         let index = 0;
//         const data = this.data;
//         return {
//             next() {
//                 return index < data.length
//                     ? { value: data[index++], done: false }
//                     : { done: true };
//             },
//         };
//     },
// };


const myInterableObj = {
    data: [1, 2, 3, 4, 5],
    [Symbol.iterator]() {
        let index = 0;
        const data = this.data;
        return {
            next() {
                return index < data.length ? { value: data[index++], done: false } : { done: true }
            }
        }
    }
}

for (let ob of myInterableObj) {
    console.log(ob);
}

class IterrableArray {
    constructor(data) {
        this.data = data;
    }
    [Symbol.iterator]() {
        let index = 0;
        const data = this.data;
        return {
            next() {
                return index < data.length ? { value: data[index++], done: false } : { done: true }
            }
        }
    }
}

const iArray = new IterrableArray([10, 20, 30, 40, 50]);
console.log(iArray);
for (const ia of iArray) {
    console.log(ia);
}



// const myModule = (function () {
//     let privateVar = 0;
//     function privateMethod() {
//         console.log('Private method called');
//     }
//     return {
//         increment: function () {
//             privateVar++;
//             console.log(`Current value: ${privateVar}`);
//         },
//     };
// })();


const myCustomModule = (function () {
    console.log('Module function..');
    let privateVar = 0;
    function privateMethod() {
        console.log('Private Method');
    }
    return {
        increment: function () {
            privateVar++;
            console.log(`Current value: ${privateVar}`);
        },
        callPrivateMethod: function () {
            privateMethod();
        }
    }
})();

myCustomModule.increment();
myCustomModule.callPrivateMethod();


const nestedArray = [1, [2, [3, 4]], 5];

// function flatterArray(arr) {
//     return arr.reduce((acc, value) => {
//         if (Array.isArray(value)) {
//             acc.push(...value)
//         }
//         else {
//             acc.push(value)
//         }
//         return acc;
//     }, [])
// }

function flatterArray(arr) {
    return arr.reduce((acc, value) => {
        return Array.isArray(value) ? acc.concat(flatterArray(value)) : acc.concat(value)
    }, [])
}


console.log(flatterArray(nestedArray));



const obj = {
    name: "Alice",
    address: {
        city: "Bangalore",
        location: {
            pin: 560001
        }
    }
};


function flattenObject(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        console.log('Key: ', newKey);
        console.log('Typeof: ', typeof obj[key]);
        if (typeof obj[key] === 'object') {
            flattenObject(obj[key], newKey, result)
        }
        else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

console.log("FlattenObject: ", flattenObject(obj))

const objCircular = { a: 1, b: 2 };
objCircular.self = objCircular;


function safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return "[Circular]";
            }
            seen.add(value);
        }
        return value;
    })
}

console.log(safeStringify(objCircular));

const objClone = { a: 1, b: { c: 2 } };

const deepClone = JSON.parse(JSON.stringify(objClone));
deepClone.b.c = 10;
console.log(objClone);

const deepClone2 = structuredClone(objClone);
deepClone2.b.c = 100;
console.log(objClone);


fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((rowData) => {
        return rowData.json();
    })
    .then((result) => {
        console.log('result:  ', result);
        return fetch(`https://jsonplaceholder.typicode.com/users/${result.id}`)
    })
    .then(rowData => rowData.json())
    .then((user) => {
        console.log('User Data: ', user);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log("Completed ");

    })



const idMap = { id: 1 }
const objMap = { id: 'value' };
const map = new Map();
map.set('key', 'value');
map.set(idMap, 'user');

console.log("Obj:,,,,,,", objMap.id);
console.log("Map.....", map.get('key'));
console.log("map..", map.get(idMap));


function* generateNumbers() {
    let i = 0;
    while (i < 5) {
        yield i++;
    }
}

const gen = generateNumbers();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);



function personDetails(name) {
    this.name = name;
}

personDetails.prototype.greet = function () {
    console.log(`Hello ji ${this.name}`);
}

const alice = new personDetails('Alice Bhai');
alice.greet()