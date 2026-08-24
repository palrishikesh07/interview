// Worker threads are used in Node.js to run CPU - intensive tasks in parallel threads so that the main event loop remains non - blocking.

// 🎯 Interview Definition
// Worker Thread
// Worker Threads run JavaScript in parallel threads inside the same Node.js process.



const express = require("express");

const { Worker } = require("worker_threads");

const app = express();
const PORT = process.env.PORT || 3000;


app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
})


app.get("/blocking", (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000_000; i++) {
    counter++;
  }
  res.send(200).send('The result is ${counter}');
});


app.get("/blocking-worker-thread", (req, res) => {
  
  const worker = new Worker("./worker.js");

  worker.on("error",(err)=>{
    res.status(200).send({message:`An error occured ${err}`});
  })

  worker.on("message",(data)=>{
    res.status(200).send({message:`Result is ${data}`});
  })

});



app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})

