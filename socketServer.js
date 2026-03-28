const express = require('express');
const app = express();
const PORT = 5000;
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);
    socket.on('message', (data) => {
        console.log("Message received: ", data);
        io.emit('message', data);
    })

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id)
    })

})


server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
})


// app.get('/', ((req, res) => {
//     return res.json({ message: "hi" })
// }))

// app.listen(PORT, (() => {
//     console.log(`Server is running on ${PORT}`)
// }))