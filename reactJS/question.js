let a = {};
let b = { key: "b" }
let c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(typeof b, typeof c);
console.log(a[b], a[c]);

// const obj = {
//     value: 42,
//     method: (function () {
//         console.log(this.value);
//     }, 300)
// }

// obj.method()