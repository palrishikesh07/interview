const arr = [1, 2, 2, 3, 4, 4, 4, 5, 5];

function getUniqueArray(arr) {
    let i = 0;
    const uniqueArray = [arr[0]];
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            uniqueArray.push(arr[j]);
            i = j;
        }
    }
    return uniqueArray;
}
const arrValue = getUniqueArray(arr);
console.log(arrValue);