let arr = ["eat", "ate", "tea", "bat", "map", "pam"];

let obj = {};

for (let arrValue of arr) {
    let assendingValue = arrValue.split('').sort().join('');

    if (obj[assendingValue]) {
        obj[assendingValue].push(arrValue);
    }
    else {
        obj[assendingValue] = [arrValue];
    }
}

console.log(Object.values(obj))