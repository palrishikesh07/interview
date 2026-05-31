## JS/threory/theory1.js
```js
61. What is object-oriented programming in JS?  
Object-Oriented Programming (OOP) is a programming style where code is organized using objects and classes.

Main OOP Concepts:  
- Polymorphism  
- Abstraction 
- Inheritance  
- Encapsulation  

Example:
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}

const user = new Person("Deepak");
user.greet();

Why Use OOP?  
- Reusable code  
- Better organization  
- Easier maintenance  

62. What is a constructor function?  
Before ES6 classes, constructor functions were used to create objects.

Example:
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const user = new Person("Deepak", 22);
console.log(user.name);

Important:  
- new keyword creates object  
- this refers to the new object  
- Constructor functions usually start with capital letters  

63. What is prototypal inheritance?  
JavaScript uses prototypes to inherit properties and methods from other objects.

Example:
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log("Hello");
};

const user = new Person("Deepak");
user.greet();

How It Works:  
- Objects inherit from prototypes  
- Shared methods improve memory efficiency  

Important: Almost everything in JavaScript is based on prototypes.

64. What is a class in ES6?  
ES6 introduced class syntax to simplify object creation.

Example:
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hello " + this.name);
    }
}

const user = new Person("Deepak");
user.greet();

Benefits:  
- Cleaner syntax  
- Easier inheritance  
- More readable OOP code  

Important: Classes are syntactic sugar over prototypes.

65. What is this keyword in methods?  
this refers to the object calling the method.

Example:
const person = {
    name: "Deepak",
    greet() {
        console.log(this.name);
    }
};

person.greet(); // Deepak

Important: In arrow functions, this behaves differently because arrow functions do not have their own this.

Example:
const obj = {
    name: "Deepak",
    greet: () => {
        console.log(this.name);
    }
};

obj.greet(); // undefined

66. What is the difference between static and instance methods?

Instance Method  
- Belongs to: Object instance  
- Called on: object.method()

Static Method  
- Belongs to: Class itself  
- Called on: Class.method()

Example:
class MathHelper {
    static add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }
}

console.log(MathHelper.add(2, 3)); // 5

const obj = new MathHelper();
console.log(obj.multiply(2, 3)); // 6

Important: Static methods are called directly using the class name.

67. What is inheritance and method overriding?

Inheritance  
Allows one class to acquire properties and methods of another class.

Example:
class Animal {
    speak() {
        console.log("Animal sound");
    }
}

class Dog extends Animal {
    bark() {
        console.log("Woof");
    }
}

const dog = new Dog();
dog.speak(); // Animal sound
dog.bark();  // Woof

Method Overriding  
Child class replaces parent method.

Example:
class Animal {
    speak() {
        console.log("Animal");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog");
    }
}

const dog = new Dog();
dog.speak(); // Dog

68. What is encapsulation and private fields?  
Encapsulation means hiding internal details and restricting direct access to data.

ES6 Private Fields  
Use #.

Example:
class BankAccount {
    #balance = 0;

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount();
account.deposit(500);
console.log(account.getBalance()); // 500

Benefit: Protects sensitive data from direct modification.

69. What is a module (ES6 modules)?  
Modules allow splitting code into separate reusable files.

Export Example:
export const name = "Deepak";

Import Example:
import { name } from "./file.js";

Benefits:  
- Better organization  
- Reusability  
- Avoid global scope pollution  

Important: Each module has its own scope.

70. What is the difference between import and export?

export  
- Purpose: Share code from file  

import  
- Purpose: Use code from another file  

Named Export
export const age = 25;

Named Import
import { age } from "./file.js";

Default Export
export default function greet() {
    console.log("Hello");
}

Default Import
import greet from "./file.js";

Key Difference:  
Named Export  
- Multiple allowed  
- Must use same name  

Default Export  
- Only one allowed  
- Any name can be used
```

