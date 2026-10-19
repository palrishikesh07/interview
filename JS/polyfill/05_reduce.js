var arr = [2, 3, 4, 5, 10, 13];

// Reduce
// arr.reduce((accumulator,currentValue,index,arr)={},initialValue);

console.log("Sum", arr.reduce((acc, value, index, arr) => acc + value, 0));

// Polyfill

Array.prototype.customReduce = function (callback, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? callback(accumulator, this[i], i, this) : this[i];
    }

    return accumulator;
}

console.log("Sum", arr.customReduce((acc, value, index, arr) => acc + value, 0));
