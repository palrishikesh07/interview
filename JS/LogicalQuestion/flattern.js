let arr = ["eat", "ate", "tea", "bat", "map", "pam"];
// Output:
// [
//   ["eat", "ate", "tea"],
//   ["bat"],
//   ["map", "pam"]
// ]
let obj = {};


for (const i of arr) {
    const sortedString = i.split("").sort().join("");

    if (obj[sortedString]) {
        obj[sortedString].push(i);
    }
    else {
        obj[sortedString] = [i];
    }

}

console.log("obj: " + JSON.stringify(obj,null,2));