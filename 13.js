
const credentials = btoa('palrishikesh07@gmail.com:HENNGECHALLENGE');
console.log(credentials);


// Move 0 to end
let arr = [0, 1, 0, 3, 13];

function moveZeroToEnd(arr) {
    let n = arr.length;
    let newArrr = [];
    for (let i = 0; i < n; i++) {
        if (arr[i] != 0) {
            newArrr.push(arr[i]);
        }
    }

    for (let i = newArrr.length; i < n; i++) {
        newArrr.push(0);
    }
    return newArrr;
}

// console.log(moveZeroToEnd(arr));


function moveZeroToEndWithoutExtra(arr) {
    let n = arr.length;
    let index = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[index] = arr[i];
            index++;
        }
    }

    for (let i = index; i < n; i++) {
        arr[i] = 0;
    }

}

moveZeroToEndWithoutExtra(arr);
console.log(arr)



// Count words

const str = "Co is here    new way found  ";

function getWordCount(str) {
    let count = 0;
    let isSpace = true;

    for (let i = 0; i < str.length; i++) {
        if (str[i] != " " && isSpace == true) {
            count++;
            isSpace = false;
        }
        else if (str[i] == " ") {
            isSpace = true;
        }
    }

    return count;
}

console.log(getWordCount(str));



let string = 'JavaScript is a High level langauge';

function findVowels(str) {
    let vowels = "aeiouAEIOU";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count = count + 1;
        }
    }
    return count;
}

console.log(findVowels(string));


function checkStrLength(str,space = false){
    let count = 0;

    for(let val of str){
        if(space && val == " ") continue;
        count++;
    }

    return count;
}

console.log(checkStrLength(string));



function fruits(a,b,c,d,e){
    return "Hello World!";
}

function fruitsNew(a,b,c="apple",d,e){
    return "Hello World!";
}

console.log("fruits length "+fruits.length);  //  5, parameter count 
console.log("fruits length "+fruitsNew.length);  //  2, parameter count before default value and ignore from that(default value) 
console.log("fruits length "+fruits().length); // 12, return Word length


//Check scope

function checkoutScope(){
    var a=b=3;
    console.log(typeof a); // number
    console.log(typeof b); // number
}

checkoutScope();

 console.log(typeof a); // undefiend it global scope is with function scope, not outside of function
 console.log(typeof b); // number


 for(i=0;i<=3;i++){
    setTimeout(() => {
        console.log(i)// 4 4 4 4
    }, 1000);
 }