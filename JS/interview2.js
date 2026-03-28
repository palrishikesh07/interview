// Map Vs Set

/*
🚀 SUPER SIMPLE MEMORY TRICK
🟢 Set = Unique Box
🔵 Map = Key-Value Register
*/

/*
Map
A Map stores data as key-value pairs, where keys can be of any data type (strings, numbers, booleans, objects, functions)
Can use objects as keys, which is not possible with regular objects.
Provides methods like .set(key, value), .get(key), .has(key), .delete(key), and .size to manage data efficiently.

Use Map When:
You need key-value structure
Keys are not strings (like object keys)
Better performance than plain object

*/


// Set
/*
A Set stores a collection of unique values (no duplicates), with no associated keys.
Values can be of any type, but only one instance of each value is stored.
Ideal for removing duplicates from arrays or checking membership efficiently.
Methods include .add(value), .has(value), .delete(value), and .size.

🟢 Use Set When:
Remove duplicate array values
Store unique IDs
Check if value exists quickly
*/

/*
| Feature    | Set               | Map                   |
| ---------- | ----------------- | --------------------- |
| Stores     | Only values       | Key + Value           |
| Duplicates | ❌ Not allowed     | ❌ Keys must be unique |
| Access     | No key access     | Access by key         |
| Use Case   | Remove duplicates | Store related data    |

*/


// Q. Object vs Map

/*
Object
Object keys are strings or symbols, and they are converted to strings automatically.
Order is not guaranteed and can vary across JavaScript engines.
Better for read-heavy operations with string keys.

*/
/*
Map
Map allows keys of any type, including objects.
Maintains insertion order reliably. 
More efficient for frequent additions and deletions. 
*/

/*

| Feature     | Object                    | Map                            |
| ----------- | ------------------------- | ------------------------------ |
| Key Type    | String / Symbol           | Any type                       |
| Order       | Not guaranteed (older JS) | Always insertion order         |
| Size        | No direct property        | map.size                       |
| Iteration   | Need Object.keys()        | Directly iterable              |
| Performance | Good for small            | Better for frequent add/remove |

*/


/*
That is Weak in JavaScript.
👉 If no other reference exists, JavaScript garbage collector removes it automatically.
*/

/*
WeakMap
WeakMap stores key-value pairs where keys must be objects and are weakly referenced.
Values can be any type, including primitives.
Ideal for caching, storing private data, or associating metadata with objects without preventing their garbage collection

let student = { name: "Ravi" };

const weakMap = new WeakMap();
weakMap.set(student, "Topper");

student = null; 
// Now object can be garbage collected
👉 When student is removed
👉 WeakMap automatically forgets it



WeakSet
WeakSet stores only objects and holds weak references to them.
Useful for tracking object presence (e.g., active users, processed DOM nodes) without affecting their lifecycle

let user = { name: "Ramesh" };
const weakSet = new WeakSet();
weakSet.add(user);
user = null;
// Now automatically removed


| Feature            | WeakMap     | WeakSet     |
| ------------------ | ----------- | ----------- |
| Stores             | Key → Value | Only Values |
| Keys Type          | Object only | Object only |
| Iterable           | ❌ No        | ❌ No        |
| Size Property      | ❌ No        | ❌ No        |
| Garbage Collection | Automatic   | Automatic   |


*/