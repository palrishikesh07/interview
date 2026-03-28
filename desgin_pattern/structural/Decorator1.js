// Decorator Pattern allows behavior to be added to an object dynamically without modifying its structure.

/*
Meaning:
Object + Wrapper = New Behavior
*/

/*

Very common interview examples.

Pizza Toppings
Pizza
   |
Cheese
   |
Olives
   |
Mushrooms

Each topping decorates the pizza.

Middleware (Node.js)

Example:

Request
   |
Auth Middleware
   |
Logger Middleware
   |
Controller

Each middleware adds functionality.
*/

//We'll build the Coffee example using Decorators.
// Step 1 — Base Component

class Coffee {
    cost() {
        return 50;
    }
    description() {
        return "Basic Coffee";
    }
}
// Step 2 — Decorator Base Class

class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost();
    }
    description() {
        return this.coffee.description();
    }
}
//Decorator wraps the base object.
//Step 3 — Concrete Decorators
//Milk Decorator

class MilkDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 10;
    }
    description() {
        return this.coffee.description() + ", Milk";
    }
}

// Sugar Decorator

class SugarDecorator extends CoffeeDecorator {
    cost() {
        return this.coffee.cost() + 5;
    }
    description() {
        return this.coffee.description() + ", Sugar";
    }
}

// Client Code


let coffee = new Coffee();

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.description() + " - Price: " + coffee.cost());

/*
Coffee
  |
MilkDecorator
  |
SugarDecorator

Each decorator adds behavior.


When To Use Decorator Pattern

Use it when:

1️⃣ Want to add functionality dynamically
2️⃣ Avoid subclass explosion
3️⃣ Follow Open/Closed Principle
*/

// JavaScript Real Example

// Example: Logging Decorator

function logger(func) {
    return function (...args) {
        console.log(`Calling ${func.name}`);
        return func(...args);
    }
}

function add(a, b) {
    return a + b;
}


const decoratedAdd = logger(add);
console.log(decoratedAdd(2, 3))

//Best answer 👇
//Decorator Pattern dynamically adds new behavior to objects without modifying their structure.