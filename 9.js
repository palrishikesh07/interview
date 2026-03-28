function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function () {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const p1 = new Person('Alice', 30);
const p2 = new Person('Bob', 25);

p1.greet(); // Hello, my name is Alice and I am 30 years old.
p2.greet(); // Hello, my name is Bob and I am 25 years old.

function Animal(type) {
    this.type = type;
}

Animal.prototype.speak = function () {
    console.log(`${this.type} make sound...`);
}

const dog = new Animal('Dog');
dog.speak();


const animalPrototype = {
    walk: function () {
        console.log(`${this.type} will walk...`);
    }
}

const cat = Object.create(animalPrototype);
cat.type = 'Cat';
cat.walk()




// class

class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi, I'm ${this.name}.`);
    }
}

const pc1 = new PersonClass('Rishi', 21);
pc1.greet()



const perssonObj = {
    name: "Charlie",
    greet() {
        console.log(`Hey, I'm ${this.name}.`);
    }
}

perssonObj.greet()

const rishi = { name: "Hrishikesh" };

// rishi.__proto__ = perssonObj;
// rishi.greet();

// Object.setPrototypeOf(rishi, perssonObj);
// rishi.greet();

perssonObj.greet.call(rishi)


function introduce(city, country) {
    console.log(`Hi, I'm ${this.name} from ${city}, ${country}.`);
}


const personAlice = { name: "Alice" };

introduce.call(personAlice, 'New York', 'USA');
introduce.apply(personAlice, ['Paris', 'Frances']);

const boundFunction = introduce.bind(personAlice, 'London', 'UK');
boundFunction();


name = "raj";
const arrowPerson = {
    name: "Bob",
    greet: function () {
        console.log(`Hello , my name is ${this.name}.`); // Regular function: `this`
    },
    arrowGreet: () => {
        console.log(`Hello Greet, my name is ${this.name}.`); // Arrow function:
    }
}

arrowPerson.greet(); // Hello , my name is Bob.
arrowPerson.arrowGreet(); // Hello Greet, my name is undefined.

// Method chaining implementation

class Calculator {
    constructor(value = 0) {
        this.value = value;
    }
    add(num) {
        this.value += num;
        return this;
    }
    subtract(num) {
        this.value -= num;
        return this;
    }
    multiply(num) {
        this.value *= num;
        return this;
    }

}
const result = new Calculator(0).add(20).subtract(1).multiply(10);
console.log(result);




const SingleTon = (function () {
    let instance;

    function createInstance() {
        return { message: "I am the only instance" }
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
console.log(typeof instance1);
console.log(typeof instance2);
console.log(instance1 === instance2);


const sayHiMixin = {
    sayHi() {
        console.log(`Hi, my name is ${this.name}.`);
    }
}

class PersonMixin {
    constructor(name) {
        this.name = name;
    }
}

//Mixin
Object.assign(PersonMixin.prototype, sayHiMixin);

const pM = new PersonMixin("Alice");
pM.sayHi()




