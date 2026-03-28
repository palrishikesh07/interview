//Abstract Factory creates a family of related objects.\
//Abstract Factory is a creational design pattern that provides an interface for creating families of related objects without specifying their concrete classes.
/*
 Factory Family
-------------------------
India Factory → IndiaCar + IndiaBike
USA Factory   → USACar + USABike
*/

//Car products
class IndiaCar {
    manufacture() {
        console.log("Manufactoring car for India")
    }
}

class USACar {
    manufacture() {
        console.log("Manufactoring car for USA");
    }
}

// Bike Products
class IndiaBike {
    manufacture() {
        console.log("Manufactoring bike for India");
    }
}

class USABike {
    manufacture() {
        console.log("Manufactoring bike for USA");
    }
}

/*
Abstract Factory (Blueprint)
This defines what methods factories must implement.
*/

class VehicleFactory {
    createCar() { }
    createBike() { }
}

//Concrete Factories
class IndiaFactory extends VehicleFactory {
    createCar() {
        return new IndiaCar();
    }
    createBike() {
        return new IndiaBike();
    }
}


class USAFactory extends VehicleFactory {
    createCar() {
        return new USACar();
    }
    createBike() {
        return new USABike();
    }
}

//Client Code

function client(factory) {
    const car = factory.createCar();
    const bike = factory.createBike();
    car.manufacture();
    bike.manufacture();
}

// Choose factory
const factoryOfIndia = new IndiaFactory();
const factoryOfUSA = new USAFactory();
client(factoryOfIndia);
client(factoryOfUSA);
