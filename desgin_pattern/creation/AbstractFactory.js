// The Abstract Factory is a Creational Design Pattern.
// It provides an interface for creating families of related objects without specifying their concrete classes.

// 👉 In simple words:
// Instead of creating objects directly using new, we create factories that produce related objects.

// Without Abstract Factory we create objects using many if/else conditions.
// Abstract Factory moves object creation logic into factories and creates families of related objects.


class IndiaCar {
    manufacture() {
        console.log("Manufacturing India Car");
    }
}

class IndiaBike {
    manufacture() {
        console.log("Manufacturing India Bike");
    }
}

class USACar {
    manufacture() {
        console.log("Manufacturing USA Car");
    }
}

class USABike {
    manufacture() {
        console.log("Manufacturing USA Bike");
    }
}

// Client Code

const country = "USA";

let car;
let bike;

if (country === "India") {
    car = new IndiaCar();
    bike = new IndiaBike();
}
else if (country === "USA") {
    car = new USACar();
    bike = new USABike();
}

car.manufacture();
bike.manufacture();

/*
Problems in This Approach
Too many conditions
If we add more countries, Code becomes messy
if(country === "India"){}
else if(country === "USA"){}
else if(country === "Japan"){}
else if(country === "Germany"){}

This creates tight coupling.
We must change client logic again.
*/


