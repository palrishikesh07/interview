
const person = {
    name: "Hrishikesh",
    greet: function () {
        console.log(`Hello ${this.name}`);
    }
}


const rishi = {
    name: "Rishikesh"
}
person.greet()
const greetBound = person.greet.bind(rishi);
greetBound()


