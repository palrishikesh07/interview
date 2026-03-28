function a() {
    b();
}
function b() {
    c();
}
function c() {
    throw new Error("Something went wrong");
}
// try {
//     a();
// } catch (error) {
//     console.error(error.stack); // Stack trace of the error
// }

class AppError extends Error {
    constructor(message, userId) {
        super(message);
        this.name = "AppError";
        this.userId = userId;
        this.timestamp = new Date();
    }
}
try {
    throw new AppError("Operation failed", 12345);
} catch (error) {
    // console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.log(JSON.stringify(error));
}




function multiply(a, b, c) {
    return a * b * c;
}

// console.log(multiply(10, 20, 20));
const partialMultiply = multiply.bind(null, 2);
console.log(partialMultiply(3, 4));







const partialAdd = (a, b, c) => {
    return a + b + c;
}

const five = partialAdd.bind(null, 5);
console.log(five(10, 15));



console.log("Start")

process.nextTick(() => {
    console.log("Next Tick called");
})

setImmediate(() => console.log('Set Immediate'))
console.log("End")


test('detect memory leaks', () => {
    const usedBefore = process.memoryUsage().heapUsed;
    const arr = new Array(100000).fill(0);
    global.gc(); // Trigger garbage collection
    const usedAfter = process.memoryUsage().heapUsed;
    expect(usedAfter).toBeGreaterThan(usedBefore);
});