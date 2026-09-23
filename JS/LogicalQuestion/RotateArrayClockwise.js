/*
Rotate the given array clockwise.
input - [1,2,3,4,5,6]
output - [5,6,1,2,3,4]
*/

let arr1 = [1, 2, 3, 4, 5, 6];

function rotateArray(arr, k) {
    let n = arr.length;

    if (n === 0) return arr;
    k = k % n;

    let newArray = [];
    for (let i = k; i < n; i++) {
        newArray.push(arr[i]);
    }
    for (let i = 0; i < k; i++) {
        newArray.push(arr[i]);
    }

    return newArray;

}

console.log(rotateArray(arr1, 7))