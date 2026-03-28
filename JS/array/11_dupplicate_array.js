// Simple Approach

const arr = [4, 3, 2, 8, 4, 3, 2, 8]

function findDuplicateValueWithArray(arr) {
    const uniqueValues = [];
    const duplicateValues = [];

    for (let i = 0; i < arr.length; i++) {
        if (uniqueValues.indexOf(arr[i]) !== -1) {
            duplicateValues.push(arr[i]);
        }
        else {
            uniqueValues.push(arr[i])
        }
    }
    return duplicateValues;
}

console.log(findDuplicateValueWithArray(arr))

function findDuplicateValueWithSet(arr) {
    const duplicateValues = [];
    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
        if (set.has(arr[i])) {
            duplicateValues.push(arr[i]);
        }
        else {
            set.add(arr[i]);
        }
    }
    return duplicateValues;
}

console.log(findDuplicateValueWithSet(arr));

// Wihtout Extra spaces


// function findDuplicateWithoutExtraSpace(arr) {
//     const duplicateValues = [];

//     for (let i = 0; i < arr.length; i++) {
//         const index = Math.abs(arr[i]) - 1;
//         if (arr[index] < 0) {
//             duplicateValues.push(arr[i]);
//         } else {
//             arr[index] = -arr[index];
//         }
//     }
//     return duplicateValues;
// }


//[4, 3, 2, 8, 4, 3, 2, 8]
function findDuplicatesConstantSpace(nums) {
    const resultSet = [];

    for (let i = 0; i < nums.length; i++) {
        // Get index based on value
        const index = Math.abs(nums[i]) - 1;

        // If already negative → duplicate found
        console.log("index:", index)
        if (nums[index] < 0) {
            resultSet.push(index + 1);
            console.log("index Inner:", index)
        }

        // Mark as visited by making it negative
        nums[index] = nums[index] * -1;
    }

    return resultSet;
}
console.log(findDuplicatesConstantSpace(arr));
