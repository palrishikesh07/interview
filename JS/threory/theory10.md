##
```js
91. Write a function to find the sum of an array.

Using reduce()
function sumArray(arr) {
    return arr.reduce((total, num) => total + num, 0);
}

console.log(sumArray([1, 2, 3, 4]));

Output:
10

Using Loop
function sumArray(arr) {
    let sum = 0;

    for (let num of arr) {
        sum += num;
    }

    return sum;
}

92. Write a function to reverse a string.

Using split(), reverse(), join()
function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString("hello"));

Output:
olleh

Using Loop
function reverseString(str) {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return reversed;
}

93. Write a function to find the largest number in an array.

Using Math.max()
function largestNumber(arr) {
    return Math.max(...arr);
}

console.log(largestNumber([2, 8, 5, 1]));

Output:
8

Using Loop
function largestNumber(arr) {
    let largest = arr[0];

    for (let num of arr) {
        if (num > largest) {
            largest = num;
        }
    }

    return largest;
}

94. Write a function to check if a string is a palindrome.
A palindrome reads same forward and backward.

Example:
function isPalindrome(str) {
    const reversed = str.split("").reverse().join("");
    return str === reversed;
}

console.log(isPalindrome("madam"));

Output:
true

Case-Insensitive Version
function isPalindrome(str) {
    str = str.toLowerCase();
    return str === str.split("").reverse().join("");
}

95. Write a function to remove duplicates from an array.

Using Set
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4]));

Output:
[1, 2, 3, 4]

Using filter()
function removeDuplicates(arr) {
    return arr.filter((item, index) =>
        arr.indexOf(item) === index
    );
}

96. Write a function to implement debounce.
Debouncing delays execution until the user stops triggering events.

Example:
function debounce(fn, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

Usage:
const search = debounce(() => {
    console.log("Searching...");
}, 500);

Common Uses:
- Search bars
- Resize events
- Auto-save

97. Write a function to implement throttle.
Throttling limits execution frequency.

Example:
function throttle(fn, delay) {
    let lastCall = 0;

    return function(...args) {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

Usage:
const scrollHandler = throttle(() => {
    console.log("Scrolling...");
}, 1000);

Common Uses:
- Scroll events
- Mouse movement
- Window resizing

98. Write a function to flatten a nested array.

Using flat()
function flattenArray(arr) {
    return arr.flat(Infinity);
}

console.log(flattenArray([1, [2, [3, 4]]]));

Output:
[1, 2, 3, 4]

Recursive Solution
function flattenArray(arr) {
    let result = [];

    for (let item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flattenArray(item));
        } else {
            result.push(item);
        }
    }

    return result;
}

99. Write a function to implement a simple pub/sub pattern.

Example:
class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    publish(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(data);
            });
        }
    }
}

const pubsub = new PubSub();

pubsub.subscribe("message", data => {
    console.log(data);
});

pubsub.publish("message", "Hello World");

Output:
Hello World

100. Write a function to implement a basic Promise.all.

Example:
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
           .then(result => {
                results[index] = result;
                completed++;

                if (completed === promises.length) {
                    resolve(results);
                }
            })
           .catch(reject);
        });
    });
}

Usage:
promiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
])
.then(console.log);

Output:
[1, 2, 3]
```

