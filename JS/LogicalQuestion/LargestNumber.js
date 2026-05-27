// Largest Number

function largestNumber(nums) {
    // Your implementation
    const sortedNums = nums.sort((a, b) => {
        const order1 = '' + a + b;
        // console.log("order1..", order1);
        const order2 = '' + b + a;
        // console.log("order2..", order2);
        // console.log("order2.localeCompare(order1)..", order2.localeCompare(order1));
        return order2.localeCompare(order1);
    });
    if (sortedNums[0] === 0) {
        return '0';
    }
    return sortedNums.join('');
}



// console.log(largestNumber([3, 30,8]));
// console.log(largestNumber([3, 30, 34, 5, 9]));
// console.log(largestNumber([54, 546, 548, 60]));
console.log(largestNumber([0, 9, 8, 7]));



function largestNumber2(nums) {

  const result= [];

  for (let i = 0; i < nums.length; i++) {

    const current = String(nums[i]);
    console.log("current..", current);
    // First element
    if (result.length === 0) {
      result.push(current);
      continue;
    }

    let inserted = false;

    // Compare with existing values
    for (let j = 0; j < result.length; j++) {

      const existing = result[j];

      const first = current + existing;
      const second = existing + current;

      // If current should come first
      if (first > second) {

        console.log("first..", first);
        console.log("second..", second);
        console.log("first > second..", first > second);
        result.splice(j, 0, current);

        inserted = true;

        break;
      }
    }

    // If not inserted anywhere
    if (!inserted) {
      result.push(current);
    }
  }

  const finalResult = result.join("");

  return finalResult[0] === "0"
    ? "0"
    : finalResult;
}

// console.log(largestNumber2([3, 30,8]));




function largestNumber3(nums) {

    let result = []; // to store the numbers in the desired order
    for(let i=0; i< nums.length; i++){
        const current = String(nums[i]);
        if(result.length === 0){ // First element, just add it to the result
            result.push(current);
            continue;
        }
        let inserted = false; // flag to check if current number is inserted in the result
        let resultFirstValue = result[0]; // get the first value of the result to compare with the current number
        const first = resultFirstValue + current; // concatenate the first value of the result with the current number
        const second = current + resultFirstValue;
        if(first < second){ // if current number should come before the first value of the result, insert it at the beginning
            result.unshift(current); // insert current at the beginning of the result
            inserted = true;  // 
        }
        if(!inserted){ // if current number is not inserted at the beginning, compare it with the rest of the numbers in the result
            result.push(current);
        } 

    }

    const finalResult = result.join("");
    return finalResult[0] === "0"? "0" : finalResult;
}


// console.log(largestNumber3([3, 30,8]));
// console.log(largestNumber3([3, 30, 34, 5, 9]));
// console.log(largestNumber3([54, 546, 548, 60]));
console.log(largestNumber3([0, 9, 8, 7]));

