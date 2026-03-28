const brr = [7, 2, 5, 4, 6, 3, 5, 3, 1, 1, 100, 100, 100, 100];
const arr = [7, 2, 5, 3, 5];

function bruteForce(brr, arr) {
    const newArray = [];
    // Make undefined of brr
    for (let i = 0; i <= arr.length; i++) {
        const bIndex = brr.indexOf(arr[i]); // If scanning all element of array ie. n*n
        if (bIndex !== -1) {
            brr[bIndex] = undefined;
        }
    }
    for (let bVale of brr) {
        console.log(bVale);
        if (bVale) {
            newArray.push(bVale)
        }
    }
    console.log(newArray.sort((a, b) => a - b));
}

// bruteForce(brr, arr);

function usingHashing(brr, arr) {
    const hash = {};
    const missingNumbers = [];
    for (let num of brr) {
        if (hash[num]) {
            hash[num] = hash[num] + 1;
        }
        else {
            hash[num] = 1;

        }
    }
    console.log("hash 1: ", hash);

    for (let num of arr) {
        if (hash[num]) {
            hash[num]--;
        }
    }
    console.log("hash 2: ", hash);

    for (let key in hash) {
        if (hash[key] > 0) {
            if (hash[key] > 1) { // If value is more than 1 time
                const fillArry = new Array(hash[key]).fill(key)
                missingNumbers.push(...fillArry)
            }
            else {
                missingNumbers.push(key)
            }
        }
    }
    console.log("missingNumbers: ", missingNumbers);

    console.log(missingNumbers.sort((a, b) => a - b));
}


usingHashing(brr, arr);