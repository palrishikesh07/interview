const arr = [1, 2, 3, 4, 5, 6, 7];


function leftRotateArray(array, rotations) {
    const length = array.length;
    let k = rotations % array.length;
    const tempArray = new Array(k);
    console.log("K: ", k);

    for (let i = 0; i < k; i++) {
        tempArray[i] = array[i];
    }
    console.log(tempArray);


    for (let i = 0; i < array.length - k; i++) {
        arr[i] = arr[i + k];
    }

    for (let i = 0; i < tempArray.length; i++) {
        array[(i - 1) + k] = tempArray[i];
    }
    console.log(array);

}
// console.log(leftRotateArray(arr, 4));


function reverseArray(array, start, end) {
    while (start < end) { // two pointer approach
        const temp = array[start];
        array[start] = array[end];
        array[end] = temp;
        start++;
        end--;
    }
}

function rotateLeftUsingReverse(array, rotations) {
    const length = array.length;
    let k = rotations % array.length;

    reverseArray(array, 0, k - 1); // reverse first k elements
    reverseArray(array, k, length - 1); // reverse remaining elements
    reverseArray(array, 0, length - 1); // reverse the whole array
    console.log(array);
}

console.log(rotateLeftUsingReverse(arr, 4));
