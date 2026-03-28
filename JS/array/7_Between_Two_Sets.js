//Multiple of arr1
//Factorial of arr2

let arr1 = [2, 4];
let arr2 = [16, 32, 96];


function getTotalX(arr1, arr2) {
    let count = 0;

    for (let i = arr1[arr1.length - 1]; i <= arr2[0]; i++) {
        let multipleOfArr1 = true;
        let factorialOfArr2 = true;

        for (let j = 0; j < arr1.length; j++) {
            if (i % arr1[j] !== 0) {
                multipleOfArr1 = false;
                break;
            }
        }

        for (let k = 0; k < arr2.length; k++) {
            if (arr2[k] % i !== 0) {
                factorialOfArr2 = false;
                break;
            }
        }

        if (multipleOfArr1 && factorialOfArr2) {
            count++;
        }
    }

    return count;
}

// console.log(getTotalX(arr1, arr2));


function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function getTotalX(arr1, arr2) {
    // Step 1: LCM of arr1
    let lcmArr1 = arr1.reduce((acc, val) => lcm(acc, val));
    console.log("lcmArr1: ", lcmArr1);
    // Step 2: GCD of arr2
    let gcdArr2 = arr2.reduce((acc, val) => gcd(acc, val));
    console.log("gcdArr2: ", gcdArr2);

    // Step 3: Count valid numbers
    let count = 0;
    for (let i = lcmArr1; i <= gcdArr2; i += lcmArr1) {
        console.log("lcmArr1", lcmArr1, i);
        console.log("gcdArr2", gcdArr2);
        if (gcdArr2 % i === 0) {
            count++;
        }
    }

    return count;
}

console.log(getTotalX(arr1, arr2));