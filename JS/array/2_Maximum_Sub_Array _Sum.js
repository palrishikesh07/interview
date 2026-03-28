// const arr = [-2, -5, 6, -2, -3, 1, 5, -6];
const arr = [2, -5, 6];

// console.time('Brute')
// function maxSubArrayBrute(arr) {
//     let max = arr[0];
//     for (let i = 0; i < arr.length; i++) {
//         let sum = 0;
//         for (let j = i; j < arr.length; j++) {
//             sum += arr[j];
//             max = Math.max(max, sum);
//         }
//     }
//     return max;
// }
// console.timeEnd('Brute')

// console.time('Optimal')
function maxSubArrayKadane(arr) {


    // maxSum stores the maximum subarray sum found so far
    // Initialize it with the first element of the array
    let maxSum = arr[0];


    // currentSum stores the maximum sum of subarray ending at current index
    // Start with the first element
    let currentSum = arr[0];


    // Loop starts from index 1 because index 0 is already used
    for (let i = 1; i < arr.length; i++) {


        // Print currentSum and current array value before calculation
        console.log('currentSum + arr[i]:', currentSum, '+', arr[i]);


        // Decide whether to:
        // 1. Extend the previous subarray (currentSum + arr[i])
        // 2. Start a new subarray from current element (arr[i])
        currentSum = Math.max(currentSum + arr[i], arr[i]);


        // Print updated currentSum
        console.log('currentSum:', currentSum);


        // Print maxSum before update
        console.log('maxSum Before:', maxSum);


        // Update maxSum if currentSum is greater
        maxSum = Math.max(maxSum, currentSum);


        // Print maxSum after update
        console.log('maxSum After:', maxSum);


        // Separator for readability
        console.log('-------------------');
    }

    // Return the maximum subarray sum found
    return maxSum;

}    // console.timeEnd('Optimal')

console.log('result:', maxSubArrayKadane(arr));

// console.log('maxSubArrayBrute: ', maxSubArrayBrute(arr));
