//https://www.youtube.com/watch?v=ZcJt9js4Wig
// var intervalID = setInterval(func/code,[delay,arg1,arg2,...]);

let intervalID;
let counter = 0;

function greet(name){
    counter++;
    console.log("Hello", name);

    if(counter >= 4){
        clearInterval(intervalID);
    }
}

intervalID = setInterval(greet,2000,"Rishi");

// Polyfill

function customIntervalPolyFill(){

    let intervalId  = 0;
    let intervalMap = {};

    function customSetInterval(callbackFn,dealy=0,...args){
        const id = intervalId++;

        function repeat(){
            intervalMap[id] = setTimeout(() => {
                    callbackFn(...args);
                    if(intervalMap[id]){
                        repeat();
                    }
            }, dealy);
        }
        
        repeat();

        return id;

    }

    function customClearInterval(intervalId){
        clearTimeout(intervalMap[intervalId]);

        delete intervalMap[intervalId];
    }

    return {
        customSetInterval,
        customClearInterval
    }
}



const {customSetInterval, customClearInterval} = customIntervalPolyFill();



let customIntervalID;
let customCounter = 0;


function greet(name){
    customCounter++;
    console.log("Hello", name);

    if(customCounter >= 4){
        customClearInterval(customIntervalID);
    }
}

customIntervalID = customSetInterval(greet,2000,"Raj");