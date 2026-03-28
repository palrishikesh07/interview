// Polyfill in JavaScript is a piece of code that provides modern functionality on older browsers that do not natively support it.

// How It Works: A polyfill typically checks if a feature exists(if (!Feature.prototype.method)), and if not, it defines the missing functionality using existing JavaScript capabilities.

if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchTerm) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === searchTerm) return true;
        }
        return false;
    }
}

//myMap

Array.prototype.myMap = function (cb) {
    let temp = [];
    console.log("this: ", this);
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i]))
    }
    return temp;
}

const arr = [1, 2, 3, 4, 5];
arr.myMap((n) => n * n);


Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        console.log("cb(this[i], i, this): ", this[i], i, this);
        console.log("cb(this[i], i, this): ", cb(this[i], i, this));
        if (cb(this[i], i, this)) {
            temp.push(this[i]);
        }
    }
    return temp;
};

// arr.myFilter((n) => n > 2);


Array.prototype.myReducer = function (cb, initialValue) {
    var accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }
    return accumulator;
};

let aReducer = arr.myReducer((acc, curr) => acc + curr, 0);
console.log("aReducer", aReducer);


// console.log(1 + "1")
// console.log("1" + 1);
// console.log(1 + true)
// console.log(1 + undefined)

