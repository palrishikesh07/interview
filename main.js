
const worker = new Worker('worker.js');
worker.postMessage(5);
worker.onmessage = function (result) {
    console.log('.............Result from worker:', result.data);
}


function displayWindowSize() {
    console.log(`Window size fn: ${window.innerWidth}x${window.innerHeight}`);
}

function throttling(fn, delay) {
    let now = null;
    return function (...args) {
        const current = Date.now();
        if (now == null || current - now >= delay) {
            now = current;
            return fn(...args);
        }
    }

}

const throttlingSize = throttling(displayWindowSize, 2000)

window.addEventListener("resize", () => {
    throttlingSize()
});



console.log("Platform.....", navigator.platform);
console.log("Platform.....", navigator.plugins);
