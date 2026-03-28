const arr1 = [2, 2, 1, 1, 4, 4, 5, 5, 10]

function nonRepated(arr) {
    const obj = {};
    arr.forEach((value) => {
        if (!obj[value]) {
            obj[value] = 1;
        }
        else {
            obj[value] += 1;
        }
    })
    for (let key in obj) {
        if (obj[key] == 1) {
            return Number(key);
        }
    }
}

function usingXor(arr) {
    let result = arr[0];
    for (num of arr) {
        result ^= num;
    }
    return result;
}

console.log(nonRepated(arr1))
