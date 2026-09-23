//Find the first non-repeating character in a string.

let str = "aabbbccddeffgghh";

function findNonRepeatingChar(str){
    let frequency={};

    for(let char of str){
        frequency[char] = (frequency[char] || 0) + 1
    }

    for(let char of str){
        if(frequency[char] == 1){
            return char;
        }
    }

    return -1;
}
console.log(findNonRepeatingChar(str));