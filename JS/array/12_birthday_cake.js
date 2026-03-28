const candles = [4, 4, 1, 3];

function findNoOfCandleBasic(arr) {
    let greaterNumber = -Infinity;
    let candleCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > greaterNumber) {
            greaterNumber = arr[i];
        }
    }
    console.log(greaterNumber)

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === greaterNumber) {
            candleCount++;
        }
    }

    return candleCount;
}

// console.log(findNoOfCandleBasic(candles));


//Track max + count together in a single loop
function findNoOfCandleAdvance(arr) {
    let max = -Infinity;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            count = 1;// reset count
        }
        else if (arr[i] === max) {
            count++;
        }
    }

    return count;
}

console.log(findNoOfCandleAdvance(candles));