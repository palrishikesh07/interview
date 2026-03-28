// Normal function - camelCase
// Contructor function - PascalCasing, it used to create Blue Print for object


// Before ES6
// function Person(fname, lname, contact) {
//     this.fname = fname;
//     this.lname = lname;
//     this.contact = contact;
//     this.getName = function () {
//         console.log(`Name : ${this.fname} ${this.lname}`);
//     }
// }

//// After ES6
class Person {
    constructor(fname, lname, contact) {
        this.fname = fname;
        this.lname = lname;
        this.contact = contact;
    }
    getName() {
        console.log(`Name : ${this.fname} ${this.lname}`);
    }
}

const person1 = new Person("Rishi", "Pal", "99999")
const person2 = new Person("Raj", "Patel", "66666")
const person3 = new Person("Ritika", "Singh", "88888")
person1.getName();
person2.getName();
person3.getName();
