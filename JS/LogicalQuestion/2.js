const arr = [4, 5, 6, 2];
const target = 11;

function findTarget(arr, target) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        const targetValue = target - arr[i];

        obj[targetValue] = i;
        if (obj[arr[i]] != undefined) {
            console.log("obj[arr[i]]: ", obj[arr[i]])
            return [obj[arr[i]], i];
        }

    }
    // console.log(obj)
}

console.log(findTarget(arr, target))

