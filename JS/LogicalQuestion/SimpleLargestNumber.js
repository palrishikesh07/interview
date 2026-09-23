// Find the 2nd largest element in an array without using any javascript inbuilt method.

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 87,87,9];

function findLargestNumber(arr){
    let n = arr.length;
    if(n == 0){
        return -1;
    }

    let largestNumber = arr[0];
    for(let i=1; i< n; i++){
        if(arr[i] > largestNumber){
            largestNumber = arr[i];
        }
    }
    return largestNumber;

}

// console.log(findLargestNumber(arr1));


function findSecondLargestNumber(arr){
    let n = arr.length;
    if(n ==0) return -1;

    let firstLargest = arr[0];
    let secondLargest = firstLargest;
    for(let i=0; i< n; i++){
        if(arr[i] > firstLargest){
            secondLargest  = firstLargest;
            firstLargest = arr[i];
        }
        else if(arr[i] > secondLargest && arr[i] != firstLargest){
            secondLargest = arr[i];
        }
    }
    return secondLargest;
}

console.log(findSecondLargestNumber(arr1));