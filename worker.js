self.onmessage = function (event) {
    const data = event.data;
    setTimeout(() => {
        const result = data * 2;
        self.postMessage(result);
    }, 10000);
}


// // worker.js (Web Worker)
// self.onmessage = function (event) {
//     const result = event.data * 2;
//     postMessage(result);
// };
// // main.js
// const worker = new Worker('worker.js');
// worker.postMessage(5);
// worker.onmessage = function (event) {
//     console.log('Result from worker:', event.data); // Output: 10
// };