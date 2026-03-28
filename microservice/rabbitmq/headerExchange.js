const ampq = require('amqplib');

const url = 'amqp://guest:guest@localhost:5672'

const exchange = 'my_header_exchange';

const queue = 'my_header_queue'


const messageProps1 = { headers: { 'x-match': 'all', 'color': 'red', 'size': 'small' } }
const messageProps2 = { headers: { 'x-match': 'any', 'color': 'blue', 'size': 'large' } }


async function sendMessage(exchange, msg, messageProps) {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();

        //
        await channel.assertExchange(exchange, 'headers');

        await channel.publish(exchange, '', Buffer.from(msg), messageProps)
        console.log(`Message send to exchange ${exchange}: ${msg}`);
        await channel.close();
        await connection.close();

    } catch (error) {
        console.log(error);
    }
}

async function receivedMessage(queueName, headers) {
    try {
        const connect = await ampq.connect(url);
        const channel = await connect.createChannel();

        await channel.assertQueue(queueName);

        await channel.bindQueue(queueName, exchange, '', headers);

        channel.consume(queueName, (msg) => {
            console.log(`Received message on queue ${queueName}: ${msg.content.toString()}`)
            channel.ack(msg);
        })


    } catch (error) {
        console.log(error);

    }
}

sendMessage(exchange, 'Message 1 with headers {color:red,size:small}', messageProps1)
sendMessage(exchange, 'Message 2 with headers {color:blue,size:large}', messageProps2)

receivedMessage(queue, { 'x-match': 'all', 'color': 'red', 'size': 'small' })

receivedMessage(queue, { 'x-match': 'any', 'color': 'blue', 'size': 'large' })