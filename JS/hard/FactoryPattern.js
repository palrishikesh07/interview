// “Factory Pattern centralizes object creation and returns different objects based on input without exposing instantiation logic.”
// The factory method abstracts the creation logic, making the code more maintainable.

function userFactory(type) {
    if (type === 'Admin') {
        return {
            role: 'Admin',
            permissions: ['read', 'write', 'delete']
        }
    }
    if (type === 'user') {
        return {
            role: 'user',
            permissions: ['read']
        }
    }
}

const admin = userFactory('Admin');
const user = userFactory('user');


console.log(admin);
console.log(user);


//
class Car {
    constructor() {
        this.type = 'Car';
    }
}
class Bike {
    constructor() {
        this.type = 'Bike';
    }
}
function VehicleFactory(vehicleType) {
    if (vehicleType === 'car') return new Car();
    if (vehicleType === 'bike') return new Bike();
}
const myCar = VehicleFactory('car');
console.log(myCar.type); // Output: Car