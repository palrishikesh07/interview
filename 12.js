// const { exec } = require('child_process');
// exec('node 1.js', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Test failed: ${stderr}`);
//         process.exit(1);
//     }
//     console.log(`Test passed: ${stdout}`);
// });



// const { program } = require('commander');
// program.version('1.0.0')
//     .description('A simple ClI example')
//     .option('-n --name<type>', 'Enter you name')
//     .option((options) => {
//         console.log(`Hello, ${options.name}`);

//     })

// program.parse(process.argv)


const { program } = require('commander');

program
    .version('1.0.0')
    .description('A simple CLI example')
    .option('-n, --name <name>', 'Enter your name');

program.parse(process.argv);

const options = program.opts()

if (options.name) {
    console.log(`Hello, ${options.name}`);
}


const arr = new Array(100000).fill(1)
console.log(arr);

// require('dotenv').config();
const apiKey = null;
if (!apiKey) {
    console.error('API Key is missing.');
    // process.exit(1);
}
console.log(`Using API Key: ${apiKey}`);

const interval = setInterval(() => {
    const memoryUsage = process.memoryUsage();
    // console.log('Mem: ', memoryUsage);


    const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);
    const toGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

    console.log('Memory Usage (MB):', {
        rss: toMB(memoryUsage.rss),
        heapTotal: toMB(memoryUsage.heapTotal),
        heapUsed: toMB(memoryUsage.heapUsed),
        external: toMB(memoryUsage.external),
    });

}, 1000);
clearInterval(interval)

const lastVersion = '10.0.11';
const version = lastVersion.replace(/(\d+)$/, (match) => +match + 1);
console.log("version: ", version);


const person = {
    name: "Shardul",
    greet: function () {
        console.log(`Hello, ${this.name}`);
    }
};
person.greet(); // Output: Hello, Shardul

const person2 = {
    name: "Rahul",
}
const greetFunc = person.greet.bind(person2); // Output: Hello, Rahul
greetFunc();


// Shallow clone
const obj1 = { a: 1, b: { c: 2 } };
const shallowClone = { ...obj1 };
shallowClone.b.c = 3;
console.log("OldA:", obj1.a);
shallowClone.a = 100;
console.log("NewA:", obj1.a);
console.log("NewSa:", shallowClone.a);

console.log(obj1.b.c); // Output: 3 (shared reference)
// Deep clone
const deepClone = JSON.parse(JSON.stringify(obj1));
deepClone.b.c = 4;
console.log(obj1.b.c); // Output: 3 (independent copy)



if (!Array.prototype.customMap) {
    Array.prototype.customMap = function (callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            console.log(`this[i], i: `, this[i], i);
            result.push(callback(this[i], i, this));
        }
        return result;
    };
}
console.log([10, 22, 30].customMap(x => x * 2)); // Output: [2, 4, 6]


const srt = "HRishikesh";

function reverseIt(str) {
    return str.split("").reverse().join("");
}
console.log(reverseIt(srt));


//Recursion

function factN(n) {
    if (n <= 1) return 1;
    return n * factN(n - 1);
}

console.log('Fact:L ', factN(5));



function binarySearch(arr, givenValue) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === givenValue) {
            return mid;
        }
        if (arr[mid] < givenValue) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }

    }
    return -1;
}


console.log("Binary search: ", binarySearch([1, 2, 3, 4, 5], 6)); // Output: 2
