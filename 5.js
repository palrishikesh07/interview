

const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Task 1')
    }, 1700)
})

const promise2 = new Promise((resolve) => setTimeout(resolve, 1500, 'Task 2'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'Task 3'));

// Promise.all([promise1, promise2, promise3]).then((results) => console.log('All tasks completed:', results))
//     .catch((error) => console.error('A task failed:', error));

// Promise.race([promise1, promise2, promise3]).then((results) => console.log('All tasks completed:', results))
//     .catch((error) => console.error('A task failed:', error));

//We can do custom to store order as result wise not input wise

const completeOrder = [];
const allPromiseArray = [promise1, promise2, promise3];

// allPromiseArray.forEach((promise) => {
//     promise.then((result) => {
//         completeOrder.push(result);
//         console.log("Custom Promise: ", result);

//     })
// })
// With custom wrapper (Completion order + all done)

async function runInCompletionOrder(promises) {
    const result = [];
    const wrapperFn = promises.map(singlePromise =>
        singlePromise.then(value => {
            result.push(value)
            return value;
        })
    )

    await Promise.all(wrapperFn);
    return result;
}

// async function runInCompletionOrder(promises) {
//     const results = [];
//     const wrapped = promises.map(p =>
//         p.then(value => {
//             results.push(value);
//             return value;
//         })
//     );

//     await Promise.all(wrapped);
//     return results;
// }


runInCompletionOrder(allPromiseArray).then((res) => {
    console.log('Result is ', res);
}).catch((err) => {
    console.log('err: ', err);
}).finally(() => {
    console.log("Completed custom promise");

})


