// const sayHiMixin = {
//     sayHi() {
//         console.log(`Hi, my name is ${this.name}.`);
//     }
// }

// class PersonMixin {
//     constructor(name) {
//         this.name = name;
//     }
// }

// //Mixin
// Object.assign(PersonMixin.prototype, sayHiMixin);

// const john = new PersonMixin('John');
// john.sayHi(); // Hi, my name is John.



const sayHiMixin = (Base) => class extends Base {
    sayHi() {
        console.log(`Hi, my name is ${this.name}.`);
    }
}
class Person {
    constructor(name) {
        this.name = name;
    }
}

class PersonWithHi extends sayHiMixin(Person) { }

const p = new PersonWithHi("Alice");
p.sayHi(); // Hi, my name is Alice.






// Other way

const CanRun = {
    run() {
        console.log(`${this.name} is running.`);
    }
}

const canJump = {
    jump() {
        console.log(`${this.name} is jumping.`);
    }
}

class Animal {
    constructor(name) {
        this.name = name;
    }
}
Object.assign(Animal.prototype, CanRun, canJump)
const rabbit = new Animal("Rabbit");

rabbit.run()
rabbit.jump()




const animal = {
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
};
const dog = Object.create(animal);
dog.name = "Dog";
dog.speak(); // Output: Dog makes a sound.


/**
 The new keyword creates an object, sets its prototype, binds this, and returns the object.

1️⃣ Create a new empty object
const obj = {};

2️⃣ Link prototype
obj.__proto__ = Person.prototype;


(or internally Object.setPrototypeOf)

This allows:

p instanceof Person // true

3️⃣ Bind this
Person.call(obj, "Alice");


this inside Person refers to the new object

4️⃣ Return the object
return obj;


⚠️ Exception:

If constructor returns an object, that object is returned instead

 */


class AnimalClass {
    constructor() {
        if (new.target === Animal) {
            throw new Error("Can not instantiate anstract class")
        }
    }
    speak() {
        throw new Error("Method 'speak()' must be implemented.");
    }
}

class DogAnimal extends AnimalClass {
    speak() {
        console.log("The dog barks.");
    }
}

const myDog = new DogAnimal();
myDog.speak()


class CustomArray extends Array {
    sum() {
        return this.reduce((acc, value) => acc + value, 0);
    }
}
const customArr = new CustomArray(1, 2, 3, 4, 5);
console.log('customArr sum: ', customArr.sum());


// Decorators (experimental feature)

function addRole(constructor) {
    constructor.prototype.role = 'Admin';
}

// @addRole
class HRClass {
    name = 'Rishi'
}

const hr = new HRClass();

console.log('hr role before decorator: ', hr.role); // undefined


class Engine {
    start() {
        console.log("Engine started.");
    }
}

class Car {
    constructor(engine) {
        this.engin = engine
    }
    drive() {
        this.engin.start();
        console.log("Car is driving...");
    }
}


const myEngine = new Engine();

const myCar = new Car(myEngine);
myCar.drive();


// A factory function is a function that returns a new object, whereas a constructor function is
// used with the new keyword to create objects. Factory functions offer more flexibility, such as
// avoiding the need for this.

function createFactoryFn(name, age) {
    return {
        name,
        age,
        greet() {
            console.log(`Hi, I'm ${name}.`);
        }
    }
}

const fP = createFactoryFn('Hrishikesh', 22);
fP.greet();