async function processEvents(events, hanlder){
    for(const event of eveents){
        await hanlder(event);
    }
}


// Example
const events = ["created","updated","deleted"];


await processEvents(events, )