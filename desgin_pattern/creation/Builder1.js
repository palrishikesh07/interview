//Builder Pattern is a Creational Design Pattern used to construct complex objects step-by-step.
// Instead of creating a large object using a big constructor, we build it step by step.

//Instead of passing everything in constructor, we build the car step by step.

//Product Class

class Car {
    constructor() {
        this.engine = null;
        this.wheels = null;
        this.sunroof = false;
        this.gps = false;
    }
}

//Builder Class

class CarBuilder {
    constructor() {
        this.car = new Car();
    }

    setEngine(engine) {
        this.car.engine = engine;
        return this;
    }

    setWheels(wheels) {
        this.car.wheels = wheels;
        return this;
    }

    addSunroof() {
        this.car.sunroof = true;
        return this;
    }

    addGPS() {
        this.car.gps = true;
        return this;
    }
    build() {
        return this.car;
    }
}
//this: This enables method chaining.

// Client Code
const car = new CarBuilder()
    .setEngine("V8")
    .setWheels(4)
    .addSunroof()
    // .addGPS()
    .build();

console.log(car)


/**
       Builder
          |
     CarBuilder
          |
       builds
          |
         Car


Real World Examples

Builder pattern is used in:
JavaScript / Node.js

1️⃣ Express Response Builder
res.status(200).json(data)

2️⃣ Query Builders
mongoose
  .find()
  .select()
  .limit()

3️⃣ HTML Builders
document
  .createElement()
  .appendChild()
 */