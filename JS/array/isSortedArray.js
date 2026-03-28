
let arr = [10, 20, 30, 40, 50];

function isArraySorted(arr) {
    let sorted = true;
    for (let index = 0; index < arr.length - 1; index++) {
        if (arr[index] > arr[index + 1]) {
            sorted = false
            break;
        }
    }
    return sorted;
}

let isSort = isArraySorted(arr);
console.log("isSorted: ", isSort)