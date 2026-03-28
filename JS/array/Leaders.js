const arr = [16, 17, 4, 3, 5, 2];

function leaders(arr) {
    const leaderArray = [];
    for (let i = 0; i < arr.length; i++) {

        let isLeader = true;

        for (let j = i + 1; j < arr.length; j++) {
            // console.log("I :", i, j)
            if (arr[j] > arr[i]) {
                isLeader = false;
                break; // Ignore if j is greater that means i is not leader ignore other member
            }
        }
        if (isLeader) {
            leaderArray.push(arr[i])
        }
    }
    return leaderArray;
}

// const result = leaders(arr);
// console.log(result)

function leaderRightToLeft(arr) {
    const leaderArray = [];
    let max = arr[arr.length - 1]; // Last Element is alway there
    leaderArray.push(max);
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > max) { // If right to left is greater than previous, that also store as max value
            max = arr[i];
            leaderArray.push(max);
        }
    }
    return leaderArray.reverse();
}

const resultRight = leaderRightToLeft(arr);
console.log(resultRight)
