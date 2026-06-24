//Input: [2,7,11,15], target = 9
//Output: [0,1]

const arr = [2,7,11,15];
const target  = 26;

function getTwoSum(arr,target){
    const obj = {};
    for(let i=0;i < arr.length; i++){
        //a+b=target
        // target-a = b;
        console.log("++++++++++++",i)
        const sumTarget = target - arr[i];
        console.log("sumTarget: ",sumTarget)
        if(obj[sumTarget] !== undefined){
            return [obj[sumTarget],i];
        }
        obj[arr[i]] = i; // Insert same value
        console.log(obj)
    }
    return -1;
}

console.log(getTwoSum(arr,target));