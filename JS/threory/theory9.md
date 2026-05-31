##
```js
81. Explain closures with a practical example.
A closure happens when an inner function remembers variables from its outer function even after the outer function has finished execution.

Practical Example:
function counter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}

const increment = counter();

increment();
increment();
increment();

Output:
1
2
3

Why?
The inner function still has access to count because of closure.

Real-World Uses:
- Data privacy
- Event handlers
- Timers
- Memoization

82. How can closures be used for data privacy?
Closures can hide variables from outside access.

Example:
function bankAccount() {
    let balance = 1000;
    return {
        deposit(amount) {
            balance += amount;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = bankAccount();
account.deposit(500);
console.log(account.getBalance());

Output:
1500

Important:
balance cannot be directly accessed from outside.
console.log(account.balance);

Output:
undefined

83. What is function currying?
- Currying is a technique where a function takes arguments one at a time and returns a new function until all arguments are provided.
- Currying transforms a function with multiple arguments into nested functions with one argument each.

Example:
function multiply(a) {
    return function(b) {
        return a * b;
    };
}

const double = multiply(2);
console.log(double(5));

Output:
10

Benefits:
- Reusability
- Partial application
- Cleaner functional programming

84. What is memoization?
Memoization is an optimization technique where function results are cached to avoid repeated calculations.

Example:
function memoizedAdd() {
    let cache = {};
    return function(num) {
        if (cache[num]) {
            return cache[num];
        }
        console.log("Calculating");
        cache[num] = num + 10;
        return cache[num];
    };
}

const add = memoizedAdd();
console.log(add(5));
console.log(add(5));

Output:
Calculating
15
15
Second call uses cached result.

Benefits:
- Faster performance
- Reduces expensive calculations

85. What is immutability in JavaScript?
Immutability means data cannot be changed after creation.

Instead of modifying existing data, a new copy is created.

Mutable Example:
let arr = [1, 2];
arr.push(3);

Immutable Example:
let arr = [1, 2];
let newArr = [...arr, 3];

Benefits:
- Predictable state
- Easier debugging
- Better performance in frameworks like React

86. What are pure functions?
A pure function:
1. Always returns same output for same input
2. Has no side effects

Pure Function:
function add(a, b) {
    return a + b;
}

Impure Function:
let total = 0;
function add(num) {
    total += num;
}

Why Pure Functions Matter:
- Easier testing
- Predictable behavior
- Better functional programming

87. What is the factory pattern?
The factory pattern creates objects without directly using constructors.

Example:
function createUser(name, age) {
    return {
        name,
        age,
        greet() {
            console.log("Hello " + name);
        }
    };
}

const user = createUser("Deepak", 25);
user.greet();

Benefits:
- Cleaner object creation
- Better flexibility
- Easier maintenance

88. What is the singleton pattern in JS?
Singleton ensures only one instance of an object exists.

Example:
const Database = (function() {
    let instance;
    function createInstance() {
        return {
            connect() {
                console.log("Connected");
            }
        };
    }
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);

Output:
true

Use Cases:
- Database connections
- Configuration managers
- App state management

89. What is the observer/event emitter pattern?
This pattern allows objects to subscribe and react to events.

Example:
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(data);
            });
        }
    }
}

const emitter = new EventEmitter();
emitter.on("message", data => {
    console.log(data);
});
emitter.emit("message", "Hello");

Use Cases:
- Chat applications
- Notifications
- State management

90. What is the module pattern with closures?
The module pattern uses closures to create private and public members.

Example:
const Counter = (function() {
    let count = 0;
    return {
        increment() {
            count++;
        },
        getCount() {
            return count;
        }
    };
})();

Counter.increment();
console.log(Counter.getCount());

Output:
1

Benefits:
- Encapsulation
- Private state
- Avoid global scope pollution
```

