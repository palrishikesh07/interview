
const arr = [1, 5, 3, 4, 2, 2];

// function findPairBruteForce(arr, target) {
//     let found = 0;
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length; j++) {
//             if (i == j) continue; // Have to skip self index 
//             if (arr[i] + arr[j] === target) {
//                 found++;
//             }
//         }
//     }

//     console.log(found)
// }

function findPairBruteForce(arr, target) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                count++;
            }
        }
    }

    console.log(count);
}

// findPairBruteForce(arr, 4)

//[1, 5, 3, 4, 2, 2]
function findPairOptimized(arr, target) {
    const seen = new Set();
    let count = 0;
    for (let num of arr) {
        const complement = target - num; // 4 - 1 = 3, saving complement to check later
        if (seen.has(complement)) {
            count++;
        }
        seen.add(num);
    }
    console.log('seen: ', seen);

    console.log(count);
}

findPairOptimized(arr, 4)
