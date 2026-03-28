//Builder Pattern is a Creational Design Pattern used to construct complex objects step-by-step.
// Instead of creating a large object using a big constructor, we build it step by step.

//Wihout Builder : Constructor becomes too complex.


class Car {
    constructor(engine, wheels, sunroof, gps) {
        this.engine = engine;
        this.wheels = wheels;
        this.sunroof = sunroof;
        this.gps = gps;
    }
}
// Creating Objects
const car1 = new Car("V8", 4, true, true);
const car2 = new Car("V6", 4, true, false);
const car3 = new Car("V4", 4, false, false);

console.log(car1);
console.log(car2);
console.log(car3);

/*
1️⃣ Constructor has too many parameters
2️⃣ Hard to remember parameter order
3️⃣ Optional features become confusing
4️⃣ Hard to extend
new Car("V8", true, 4, false) ❌ wrong order
*/
