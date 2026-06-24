

// Generator functions (function*) return a Generator object. 
// They can pause execution at yield and resume later via next(). 
// Each next() call runs to the next yield and returns { value, done }. 
// Useful for lazy sequences, async control flow, and infinite streams.


// 🧠 How It Works Internally
// yield → pause
// .next() → resume



function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1 
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5