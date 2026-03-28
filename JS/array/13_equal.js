//Equal

const arr = [1, 5, 5];

function equalBasic(arr) {
    const min = Math.min(...arr);
    let answer = Infinity;

    // Try 5 possible bases
    for (let base = 0; base < 5; base++) {
        let currentMin = min - base;
        let operations = 0;
        console.log("currentMin:", currentMin);
        for (let i = 0; i < arr.length; i++) {
            let diff = arr[i] - currentMin;

            // Greedy breakdown
            operations += Math.floor(diff / 5);
            diff %= 5;

            operations += Math.floor(diff / 2);
            diff %= 2;

            operations += diff; // remaining 1s
        }

        answer = Math.min(answer, operations);
    }

    return answer;
}


// console.log(equalBasic(arr));



function equalOptimized(arr) {
    const min = Math.min(...arr);
    console.log(min)
    let result = Infinity;

    for (let base = 0; base < 5; base++) {
        let target = min - base;
        // console.log("target:", target);
        let steps = 0;

        for (let num of arr) {
            let diff = num - target;
            // console.log("base: ", base, " target: ", target, " diff: ", diff);
            steps += Math.floor(diff / 5)
            steps += Math.floor((diff % 5) / 2);
            steps += (diff % 5) % 2;
        }
        result = Math.min(result, steps);
    }
    return result
}


console.log(equalOptimized(arr))