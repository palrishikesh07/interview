//compress consecutive repeated characters by replacing them with the character followed by its count (e.g., aabbb → a2b3).

let str1 = "aabbb";

function getConsecutiveChar(str) {
    let n = str.length;
    if (n == 0) return "";
    console.log(n);
    let char = str[0];
    let charCount = 1;
    let newString = "";
    for (let i = 1; i < n; i++) {
        if (str[i] == char) {
            charCount++;
        }
        else {
            newString = newString + "" + char + "" + charCount;
            charCount = 1;
            char = str[i];

        }
    }
    newString += char + charCount; // At last place, put all remaing to new string
    return newString;

}

console.log(getConsecutiveChar(str1));