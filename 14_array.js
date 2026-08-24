console.log([]); // []
console.log([]+[]); // blank
console.log(""+""); // blank
const add = [2]+[2]; // [2] will convert to "2"+"2" ie 22
console.log(add) // 22

const add2 = +[2]+ +[2]; // Need both + other wise it will be 22
console.log(add2); // 4

console.log(["Hello"] + ["Rishi"]); // HelloRishi
console.log(+["Hello"] + +["Rishi"]); // NaN


console.log(2+"5"); // 25
console.log("2"+5); // 25
console.log(+"2"+ +5); // 7

console.log("--------------------------")


// Rule 1: + Operator
// If both operands are numbers → Addition
// If either operand is a string → String concatenation

// Rule 2: -, *, /, %
// These operators always try to convert strings to numbers.

console.log(5+3+"5")  // 8 + "5" = 85
console.log(5+"3"+5); // "5" + "3" + 5 = 535
console.log("5"-3+2); // 5 - 3 + 2 = 4

console.log("*******************************************")

console.log(false+""); // false
console.log(false+[]); // false, internally it will convert [] to ""

console.log(false == []) // true, [] convert to "" means false ie false == false
console.log(false == ![]) // true, [] empty array is trutly value, ![] means false

console.log([] != []) // true, [] == [] will compare object reference != means true


console.log("*******************************************")


let numArray1 = [3,6,8];
let numArray2 = [3,6,9,11,13];

//  [a,b,c] = numArray1; // It is only Assingment it ill throw a is not defined
// console.log(a,b,c);

let [a, b] = [1, 2];   // Declaration + Assignment
[a, b] = [3, 4];       // Assignment only


const numConcat = numArray1.concat(numArray2);
console.log(numArray1)
console.log(numConcat)





let data = [10,20,30,50,'apple','banana'];

function getSum(arr){
    let sum=0;
    for(let value of arr){
        if(typeof value == 'number')
        sum += value;
    }
    return sum;
}

console.log(getSum(data));

//Map vs forEach. Map will return new array, forEach will not return array and better performances

// Find common value

let arr1 =[1,2,3,4,5,6];
let arr2 = [3,4,6,7,8];


function getCommanValue(arr1, arr2){
    let arr3 = [];
    for(let val of arr1){
        if(arr2.includes(val)){
            arr3.push(val);
        }
    }
    return arr3;
}

console.log(getCommanValue(arr1,arr2));



let dataArry = [10,20,2,4,9,,,,,,,,90,11,24,36,,,,,,,900];
// dataArry = dataArry.filter(Boolean); // return other then false
dataArry = dataArry.filter((item) => item!= false && item);
console.log(dataArry)



let missArray=[1,2,3,4,6];

function findMissingValue(arr){

    let n = arr.length+1;
    let expectedSum = n*(n+1)/2;
    let sum=0;
    
    for(let i=0; i< arr.length; i++){
        sum += arr[i];
    }

    return expectedSum - sum;

}

console.log(findMissingValue(missArray));