const memo = {};

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    if (memo[n]) return memo[n];
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return memo[n];
}
console.log("fibonacci: ", fibonacci(10));


const name = null ?? "Guest"; //nullish coalescing, only null and undefined
console.log(name); // Guest


const lName = 0 || "Kumar";

console.log(lName);

// Memoizaiton seprate function

const memoizationFn = (fn) => {
    const cache = {};
    return function memoized(...args) {
        const key = JSON.stringify(args); // argument from function
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(memoized, ...args);
        cache[key] = result;
        return result;
    }
}


let simpleNcount = 0;
const simpleFib = (self, n) => {
    if (n <= 1) return n;
    simpleNcount++;
    console.log('simpleNcount..', simpleNcount);

    return self(n - 1) + self(n - 2);
}
// console.log("Fib Simple ", simpleFib(10));

const fibnaaciMemo = memoizationFn(simpleFib);

console.log("Fib Memo ", fibnaaciMemo(10));






