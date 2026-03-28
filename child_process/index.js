const { fork } = require('child_process');

const child = fork("./child_process/child");

child.send(200);

child.on("message", (result) => {
    console.log("Reslt from child: ", result)
})