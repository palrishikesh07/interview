const arr1 = [2, 7, 11, 15]

function bruteForeApproach(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return null;
}

console.log(bruteForeApproach(arr1, 9)); // [0, 1]

function optimizeApproch(arr, target) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (obj[complement] !== undefined) {
            console.log("obj[complement]: ", obj[complement])
            return [obj[complement], i]
        }
        obj[arr[i]] = i;

    }
    console.log(obj)
    return null;
}

// console.log(optimizeApproch(arr1, 9))

function twoSumMap(arr, target) {
    const numMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(arr[i], i);
    }
    return null;
}

console.log(twoSumMap(arr1, 9)); // [0, 1]