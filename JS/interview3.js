

/*
All three methods allow us to change the this context of a function. call and apply execute immediately, while bind returns a new function for later use.
call = Call now + comma arguments
apply = Array arguments
apply = Array arguments

*/
function greet2() {
    console.log("Welcome to JavaScript Interview!")
    console.log(`All the best ${this.name}`)
}

const person1 = {
    name: "Ramesh",
    greet: function (city, country) {
        console.log(`Hi, I am ${this.name} from ${city}, ${country}`)
    }
}

const person2 = {
    name: "Suresh"
}


greet2.call(person1)
person1.greet("Delhi", "India");
person1.greet.call(person2, "Mumbai", "India")


//
person1.greet.apply(person2, ["MP", "India"])
const userAddress = person1.greet.bind(person2, "Bangalore", "India")

userAddress()



/*
❓ What is main difference between call and bind ?
✅ Answer:
call executes immediately, bind returns a new function for later execution.

*/

