
function isValid(s){
    let stack = [];
    let map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let char of s) {
        if (map[char]) {
            // If it's an opening bracket, push the corresponding closing bracket onto the stack
            stack.push(map[char]);
        } else {
            // If it's a closing bracket, check if it matches the top of the stack
            if (stack.pop() !== char) {
                return false; // Mismatched or unbalanced
            }
        }   
    }
    // Valid if stack is empty (all brackets matched)
    return stack.length === 0;
}

console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true