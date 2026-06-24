//Input: [-1,0,1,2,-1,4], target = 0
//Output: [-1,0,1],[-1,-1,2]

const arr = [-1, 0, 1, 2, -1, 4];

function getThreeSum(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] == 0) {
                    return [arr[i], arr[j], arr[k]];
                }
            }
        }
    }
}

// console.log(getThreeSum(arr));

const arr1 = [-1, 0, 0, 0, 2, 2, 2, 2, -2, -2, -2, -1];
// [ -2, -2, -2, -1, -1, 0,  0,  0,  2,  2, 2,  2]

function getThreeSumOptimizedTwoPointer(arr) {
    const sortedArray = arr.sort((a, b) => a - b);
    const n = sortedArray.length
    const outputArray = [];
    console.log(sortedArray)
    for (let i = 0; i < n; i++) {
        if (i > 0 && sortedArray[i] === sortedArray[i - 1]) continue;
        let j = i + 1;
        let k = n - 1;
        while (j < k) {
         let sum = sortedArray[i] + sortedArray[j] + sortedArray[k];
         if(sum < 0){
            j++;
         }
         else if(sum > 0){
            k--;
         } 
         else{
            outputArray.push([sortedArray[i], sortedArray[j], sortedArray[k]]);
            j++;
            k--;
            // skiping the same value
            while(j < k && sortedArray[j] == sortedArray[j-1]) j++;
            while(j<k && sortedArray[k] == sortedArray[k+1]) k--; 

         }

        }
    }
    return outputArray;
}

console.log(getThreeSumOptimizedTwoPointer(arr1));
