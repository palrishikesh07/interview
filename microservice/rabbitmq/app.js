const ampq = require('amqplib');

const url = 'amqp://guest:guest@localhost:5672'

// Queue name
const queue = 'nodequeue001';

async function sendMessage(msg) {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(msg));

        console.log(`Message  send to ${queue}: ${msg}`);
        //
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error);
    }
}

async function receiveMessage() {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        // Declare the queue to use
        await channel.assertQueue(queue);

        // Receive message from queue
        channel.consume(queue, (msg) => {
            console.log(`Received Message: ${msg.content.toString()}`);
            // Acknowledge receipt
            channel.ack(msg)
            console.log(`Waiting for messaeg on ${queue}`);

        })

    } catch (error) {

    }
}

// sendMessage("Hi, RabbitMQ! from nodeJS")


// Import the HTTP module
const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(req.url);
    if (req.url === '/send') {
        if (req.url.split('?msg=').length > 1) {
            const msg = req.url.split('?msg=')[1];
            sendMessage(msg);
            res.write(`Message sent: ${msg}\n`);
        }
        else {
            sendMessage('No message provided to send.\n');
            res.write('No message provided to send.\n');
        }

    }
    // Send the response body as 'Hello, World!'
    res.end('Hello, World!\n');
});

// Define the port to listen on const PORT = 3000;

// Start the server and listen on the specified port
server.listen(3000, 'localhost', () => {
    console.log(`Server running at http://localhost:${3000}/`);
    receiveMessage();
});