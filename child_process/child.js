process.on("message", (msg) => {
    const result = msg * 2;
    process.send(result);
})


