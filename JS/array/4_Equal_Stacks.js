const arrA = [3, 2, 1, 1, 1]
const arrB = [4, 3, 2]
const arrC = [1, 1, 4, 1]

function equalStacks(h1, h2, h3) {
    let sum1 = arrA.reduce((a, b) => a + b, 0)
    let sum2 = arrB.reduce((a, b) => a + b, 0)
    let sum3 = arrC.reduce((a, b) => a + b, 0)
    let i = 0, j = 0, k = 0;
    while (true) {
        if (i == h1.length || j == h2.length || k == h3.length) {
            return 0;
        }
        // If All sum are equal
        if (sum1 === sum2 && sum2 == sum3) {
            return sum1;
        }
        // Remove the tallest stack
        if (sum1 >= sum2 && sum1 >= sum3) {
            sum1 -= h1[i];
            i++;
        }
        else if (sum2 >= sum1 && sum2 >= sum3) {
            sum2 -= h2[j];
            j++;
        }
        else {
            sum3 -= h3[k];
            k++;
        }
    }
}


console.log(equalStacks(arrA, arrB, arrC))


