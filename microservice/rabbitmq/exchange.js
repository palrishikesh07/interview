const ampq = require('amqplib');

const url = 'amqp://guest:guest@localhost:5672'


// Exchange name
const exchange = 'my_direct_exchange';

// Queue name
const queue1 = 'my_direct_queue_1';
const queue2 = 'my_direct_queue_2';

// Routing keys
const routingKey1 = 'info';
const routingKey2 = 'error';

async function sendMessage(exchange, routingKey, msg) {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        await channel.assertExchange(exchange, 'direct');

        await channel.publish(exchange, routingKey, Buffer.from(msg))

        await channel.close();
        await connection.close();

    } catch (error) {
        console.log(error);
    }
}

async function receiveMessage(queueName, routingKey) {
    try {

        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName);
        //Binding
        await channel.bindQueue(queueName, exchange, routingKey);

        //
        channel.consume(queueName, (msg) => {
            console.log(`Received message on queue ${queueName} with routing key ${routingKey}: ${msg.content.toString()}`)
        })

    } catch (error) {
        console.log(error);

    }
}

sendMessage(exchange, routingKey1, 'Info message 1')
sendMessage(exchange, routingKey1, 'Info message 2')
sendMessage(exchange, routingKey2, 'Error message 1')


// receiveMessage(queue1, routingKey1)
// receiveMessage(queue2, routingKey2)