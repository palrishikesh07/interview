## JS/threory/theory1.js
```js
21. What is an array in JavaScript?
An array is a special object used to store multiple values in a single variable.

Example:
const fruits = ["Apple", "Banana", "Mango"];

Access Elements:
console.log(fruits[0]); // Apple

Features:
- Ordered collection
- Zero-based indexing
- Can store mixed data types

Example:
const data = ["Deepak", 25, true];

22. How do you add/remove elements from an array?

Add Elements
push() → Add at end
const arr = [1, 2];
arr.push(3);
console.log(arr);

unshift() → Add at beginning
arr.unshift(0);

Remove Elements
pop() → Remove from end
arr.pop();
shift() → Remove from beginning
arr.shift();

Example:
const numbers = [1, 2, 3];
numbers.push(4);
numbers.pop();
console.log(numbers);

23. What is the difference between push(), pop(), shift(), unshift()?
push() → Add element at end
pop() → Remove element from end
shift() → Remove element from start
unshift() → Add element at start

Example:
const arr = [1, 2];
arr.push(3);
arr.unshift(0);
console.log(arr);
arr.pop();
arr.shift();
console.log(arr);
Output:
[0][1][2][3]

24. What is map(), filter(), and reduce()?
These are important array methods used in functional programming.

map()
Creates a new array by transforming elements.
const nums = [1, 2, 3];
const doubled = nums.map(num => num * 2);
console.log(doubled);

Output:
[2][4][6]

filter()
Returns elements matching a condition.
const nums = [1, 2, 3, 4];
const even = nums.filter(num => num % 2 === 0);
console.log(even);

Output:
[2][4]

reduce()
Reduces array to a single value.
const nums = [1, 2, 3];
const sum = nums.reduce((total, num) => total + num, 0);
console.log(sum);

Output:
6

25. How do you remove duplicates from an array?

Using Set
const nums = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(nums)];
console.log(unique);

Output:
[1][2][3][4]

Why Set?
A Set stores only unique values.

Alternative Using filter()
const arr = [1, 2, 2, 3];
const unique = arr.filter((item, index) =>
    arr.indexOf(item) === index
);
console.log(unique);

26. How do you flat / flatten an array?
Flattening means converting nested arrays into a single array.

Using flat()
const arr = [1, [2, 3], [4, 5]];
console.log(arr.flat());

Output:
[1][2][3][4][5]

Deep Flatten:
const arr = [1, [2, [3, 4]]];
console.log(arr.flat(Infinity));

Using reduce()
const arr = [[1, 2], [3, 4]];
const flat = arr.reduce((acc, val) => acc.concat(val), []);
console.log(flat);

27. What is an object in JavaScript?
An object is a collection of key-value pairs.

Example:
const person = {
    name: "Deepak",
    age: 25,
    city: "Oslo"
};

Access Properties:
console.log(person.name);

Objects Can Store:
- Strings
- Numbers
- Arrays
- Functions
- Other objects

28. What is the difference between dot and bracket notation?

Dot Notation
console.log(person.name);

Bracket Notation
console.log(person["name"]);

Dot Notation
- Simple syntax
- Faster to write

Bracket Notation
- Dynamic keys supported
- Useful for spaces/special chars

Example:
const obj = {
    "first name": "Deepak"
};
console.log(obj["first name"]);

29. How do you merge two objects?

Using Spread Operator
const obj1 = {a: 1};
const obj2 = {b: 2};
const merged = {...obj1,...obj2};
console.log(merged);

Output:
{a: 1, b: 2}

Using Object.assign()
const merged = Object.assign({}, obj1, obj2);

Important:
If duplicate keys exist, later values overwrite earlier ones.

30. How do you deep clone an object?
Deep cloning creates a completely independent copy of an object.

Using structuredClone()
const obj = {
    name: "Deepak",
    address: {
        city: "Oslo"
    }
};
const clone = structuredClone(obj);

Using JSON Method
const clone = JSON.parse(JSON.stringify(obj));

Limitation:
JSON method does not copy:
- Functions
- Undefined
- Dates properly

Shallow Copy vs Deep Copy
Shallow Copy → No, does not copy nested objects
Deep Copy    → Yes, copies nested objects
```

