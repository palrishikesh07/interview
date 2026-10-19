
function largestNumber(nums) {
  nums.sort((a, b) => {
    const ab = String(a) + String(b);
    const ba = String(b) + String(a);
    
    console.log("ab: ",ab +" ba: "+ba)
    const returnValue = ba.localeCompare(ab);
    console.log("returnValue: ",returnValue)
    return returnValue;
  });

  // Handle cases like [0, 0]
  if (nums[0] === 0) {
    return "0";
  }

  return nums.join("");
}

console.log(largestNumber([10, 2]));       // "210"
console.log(largestNumber([3, 30, 34, 5, 9])); // "9534330"
console.log(largestNumber([0, 0]));         // "0"
