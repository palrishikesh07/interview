const fs = require("fs");
const readLine = require("readline");


async function  countErrors() {
    const stream = fs.createReadStream("app.log");

    const r1 = readLine.createInterface({
        input:stream,
        crlfDelay:Infinity
    })

    let count = 0;

    for await(const line of rl){
        if(line.includes("ERROR")){
            count++;
        }
    }
    console.log(count);
}