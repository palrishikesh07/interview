//Promise.race(promises) resolves or rejects as soon as the FIRST promise settles (either way).
// Useful for timeouts: race a fetch against a timeout promise. The result/error is that of the fastest promise.

const slow = new Promise(r => setTimeout(() => r('slow'), 2000));
const fast = new Promise(r => setTimeout(() => r('fast'), 500)); 

Promise.race([slow, fast])
.then(console.log); // 'fast'



// Promise.any(promises) resolves with the value of the FIRST fulfilled/successful promise.
// Rejects only if ALL promises reject, with an AggregateError. 
// Opposite of Promise.all in behavior — optimistic.

const p1 = Promise.reject('err1'); 
const p2 = Promise.reject('err2'); 
const p3 = Promise.resolve('success'); 
Promise.any([p1, p2, p3]).then(v => console.log(v)); // 'success'