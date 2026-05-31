## JS/threory/theory1.js
```js
31. What is if/else and switch?

Both are conditional statements used to make decisions in JavaScript.

if/else
Executes code based on conditions.
let age = 18;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

switch
Used when checking multiple possible values.
let day = 2;

switch(day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    default:
        console.log("Invalid Day");
}

Difference:
if/else - Better for conditions/ranges, Flexible
switch - Better for exact values, Cleaner for many cases

32. What is the difference between for, for...in, and for...of?

for
Traditional loop.
for (let i = 0; i < 3; i++) {
    console.log(i);
}

for...in
Used for iterating object keys.
const person = {
    name: "Deepak",
    age: 25
};

for (let key in person) {
    console.log(key);
}

for...of
Used for iterable values like arrays.
const nums = [1, 2, 3];

for (let num of nums) {
    console.log(num);
}

Key Difference:
Loop     - Best For
for      - Full control
for...in - Object properties
for...of - Array values

33. What is the while and do-while loop?

Both loops execute code repeatedly while a condition is true.

while Loop
Condition checked before execution.
let i = 1;

while (i <= 3) {
    console.log(i);
    i++;
}

do-while Loop
Runs at least once before checking condition.
let i = 1;

do {
    console.log(i);
    i++;
} while(i <= 3);

Difference:
while - Condition first, May run zero times
do-while - Code first, Runs at least once

34. What is the ternary operator?

The ternary operator is a shorthand for if/else.

Syntax:
condition? trueValue : falseValue

Example:
let age = 20;

let result = age >= 18? "Adult" : "Minor";

console.log(result);

Benefits:
- Shorter code
- Cleaner simple conditions

35. What is short-circuit evaluation?

JavaScript stops evaluating expressions as soon as the result is known.

Using &&
Returns first falsy value.
console.log(false && "Hello");

Output:
false

Using ||
Returns first truthy value.
console.log("" || "Default");

Output:
Default

Practical Example:
let username = "";

let displayName = username || "Guest";

console.log(displayName);

36. What is the difference between break and continue?

Keyword - Purpose
break - Stops the loop completely
continue - Skips current iteration

break Example
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        break;
    }

    console.log(i);
}

Output:
1
2

continue Example
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        continue;
    }

    console.log(i);
}

Output:
1
2
4
5

37. How do you iterate over an array or object?

Array Iteration
Using forEach()
const nums = [1, 2, 3];

nums.forEach(num => {
    console.log(num);
});

Object Iteration
Using for...in
const person = {
    name: "Deepak",
    age: 25
};

for (let key in person) {
    console.log(key, person[key]);
}

Using Object.keys()
Object.keys(person).forEach(key => {
    console.log(key);
});

38. How do you implement recursion?

Recursion is when a function calls itself until a stopping condition is met.

Example: Factorial
function factorial(n) {

    if (n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

console.log(factorial(5));

Output:
120

Important Parts:
1. Base condition
2. Recursive call

Without a base condition → infinite recursion.

39. When would you use for vs forEach()?

for Loop vs forEach()
for - More control, Can use break/continue, Faster in heavy loops

forEach() - Cleaner syntax, Cannot stop early, Better readability

for Example
for (let i = 0; i < 3; i++) {
    console.log(i);
}

forEach() Example
[1, 2, 3].forEach(num => {
    console.log(num);
});

Interview Tip:
Use forEach() for readability and for when more control is needed.

40. How do you handle early exits from loops?

Using break
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        break;
    }

    console.log(i);
}

Using return Inside Functions
function test() {

    for (let i = 1; i <= 5; i++) {

        if (i === 3) {
            return;
        }

        console.log(i);
    }
}

test();
Important:
forEach() does not support break directly.

Use:
- for
- for...of
- some()
- every()

for early exits.
```

