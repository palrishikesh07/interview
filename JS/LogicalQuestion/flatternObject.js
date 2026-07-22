let arr = [
    1,
    { a: 1, b: 2, c: { d: 3, e: { f: 4 } } },
    3,
    4,
    { g: 5, h: 6, i: [22, 23, [24]] },
    10,
    11,
    12,
    [13, [15, [16, 17, [18, [19, 20, [21]]]]]]
];


let newArr = [];
let obj = {};


function flatternArrObject(arr){
    for(let arrValue of arr){
        // console.log(arrValue)
        if(Array.isArray(arrValue)){
            flatternArrObject(arrValue);
        }
        else if(typeof arrValue === 'object'){
            for (const key in arrValue) {
                // console.log(typeof arrValue[key] === 'object');
                if(typeof arrValue[key] === 'object'){
                    flatternArrObject([arrValue[key]]) //  Have to send inside array
                }
                else{
                    obj[key] = arrValue[key];
                }
                console.log(key);
            }
        }

        else{
            newArr.push(arrValue);
        }

    }
}

flatternArrObject(arr);

console.log("new array: "+ JSON.stringify(newArr));
console.log("new obj: "+ JSON.stringify(obj));