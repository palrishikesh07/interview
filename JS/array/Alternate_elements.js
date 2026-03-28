const arr = [10, 20, 30, 40, 50];


function getAlternates(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i += 2) {
        res.push(arr[i]);
    }
    return res;
}

// const res = getAlternates(arr);
// console.log("res1: ", res)


function getAlternatesRecursive(arr, index = 0, res = []) {
    if (index >= arr.length) {
        return res;
    }
    res.push(arr[index]);
    return getAlternatesRecursive(arr, index + 2, res);
}

const resRecursive = getAlternatesRecursive(arr);
console.log("resRecursive: ", resRecursive)