async function processEvents(events, hanlder){
    for(const event of events){
        await hanlder(event);
    }
}


// Example
const events = ["created","updated","deleted"];


await processEvents(events,async(event)=>{
    await new Promise(resolve => setTimeout(resolve,100))
    console.log(event);
})