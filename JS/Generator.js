
//A Generator Function is a special function that can pause its execution using yield and 
// resume later from the same point.

// Generator functions (function*) return a Generator object. 
// They can pause execution at yield and resume later via next(). 
// Each next() call runs to the next yield and returns { value, done }. 
// Useful for lazy sequences, async control flow, and infinite streams.


// 🧠 How It Works Internally
// yield → pause
// .next() → resume

// When to use, The biggest use case is when you don't want to generate all values in memory at once.

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





function* generatorFunc() {
    yield 1;
    yield 2;
    yield 3;
    yield 'Completed !';
}

const gen = generatorFunc();
console.log('Gen1: ', gen.next());     //{ value: 1, done: false }
console.log('Gen2: ', gen.next().value); // 2
console.log('Gen3: ', gen.next().value); // 3
console.log('Gen4: ', gen.next()); //  { value: 'Completed !', done: false }, last value
console.log('Gen5: ', gen.next()); // { value: undefined, done: true }
console.log('Gen6: ', gen.next()); // { value: undefined, done: true }





function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

//Generators are iterable, You can use them directly with for...of:

for (let num of numbers()) {
    console.log(num);
}


