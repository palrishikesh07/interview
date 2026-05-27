function validatePalindrome(str) {
    // Your implementation
    const newString = str.replace(/[^a-zA-Z0-9]/g, '');
    console.log("newString..", newString);
    return newString.toLowerCase() === newString.split("").reverse().join("").toLowerCase();
}

//For the purpose of user debugging.
console.log(validatePalindrome("A man, a plan, a canal: Panama"));