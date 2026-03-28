// User does not enter any thing for specifed time,than only call api,
//  other wise reset time


function throttleMessage(fn, delay) {
    let lastCall = null;
    return function (...args) {
        const now = Date.now();
        if (lastCall == null || now - lastCall >= delay) {
            lastCall = now;
            return fn(...args)
            // return fn.apply(this, args); // preserve `this`
        }
    }
}


function sendMessage(query) {
    console.log(`Sending message ${query}`);
}

const sendMessageWithThrottling = throttleMessage(sendMessage, 2000)

sendMessageWithThrottling("H")
sendMessageWithThrottling("Hi")
sendMessageWithThrottling("Hi ")
sendMessageWithThrottling("Hi whats")

setInterval(() => {
    sendMessageWithThrottling("Hi whatsApp")
}, 1000);


// sendMessage("H")
// sendMessage("Hi")
// sendMessage("Hi ")
// sendMessage("Hi whats")
// sendMessage("Hi whatsApp")