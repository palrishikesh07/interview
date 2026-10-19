var arr = [2, 3, 4, 5, 10, 13];

// array.find(callback(currentValue,index,array));

console.log(arr.find((currentValue) => currentValue > 2));

Array.prototype.customFind = function (callback) {

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
}

console.log(arr.customFind((currentValue) => currentValue > 29));
