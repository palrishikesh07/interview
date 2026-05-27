function greet(name){
    console.log(`Hello, ${name}! My name is ${this.name}` );
}

let person={
    name:"Rishi",
}

// greet.call(person, "Alice"); // Hello, Alice! My name is Rishi


function add(a, b) {
  return a + b;
}

let numbers = [1, 2];
console.log(add.apply(this, numbers)); // Output: 3 // this is not used in add function, so we can pass any value for this. We are passing this to maintain consistency with call method.


function introduce(city, country) {
    console.log(`Hi, I'm ${this.name} from ${city}, ${country}.`);
}

const personAlice = { name: "Alice" };
introduce.apply(personAlice, ['Paris', 'Frances']); // this will be personAlice, city will be 'Paris' and country will be 'Frances'



let person2 = {
  name: "Rishi Pal",
  greet: function() {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

let person2Obj={
    name:"Raj Singh"
}
let greetPerson = person2.greet.bind(person2);
let greetPersonRaj = person2.greet.bind(person2Obj);

greetPerson(); // Output: Hello, my name is Rishi Pal.
greetPersonRaj(); // Output: Hello, my name is Raj Singh.