console.log('Start');
async function async1() {
    console.log('Async1 Start');
    await async2();
    console.log('Async1 End');
}

async function async2() {
    console.log('Async2');
}
async1();

setTimeout(() => console.log('Timeout'), 0);

console.log('End');

// Start
// Async1 Start
// Async2
// End
// Async1 End
// Timeout