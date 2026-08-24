
// Execute the function at a fixed interval,no matter how many times the event occurs.

// Throttling limits a function to execute at most ONCE per specified time window.
// Unlike debounce, it guarantees the function fires at regular intervals during continuous events.
// Used for scroll listeners, game loops, real-time updates.


// User does not enter any thing for specifed time,than only call api,
//  other wise reset time


function throttleMessage(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return fn(...args)
            // return fn.apply(this, args); // preserve `this`
        }
    }
}




function sendMessage(val){
    console.log("Sending message: ",val);
}



const sendMessageWithThrottling = throttleMessage(sendMessage, 2000)

sendMessageWithThrottling("H")
sendMessageWithThrottling("Hi")
sendMessageWithThrottling("Hi ")
sendMessageWithThrottling("Hi whats")

setInterval(() => {
    sendMessageWithThrottling("Hi whatsApp")
},100);


// sendMessage("H")
// sendMessage("Hi")
// sendMessage("Hi ")
// sendMessage("Hi whats")
// sendMessage("Hi whatsApp")



function throttle(fn, limit) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            return fn.apply(this, args);
        }
    };
}

// window.addEventListener('scroll', throttle(updateUI, 100));