const ampq = require('amqplib');

const url = 'amqp://guest:guest@localhost:5672'

const exchange = 'my_fanout_exchange';

const queue1 = 'my_fanout_queue_1'
const queue2 = 'my_fanout_queue_2'

async function sendMessage(exchange, msg) {
    try {
        const connect = await ampq.connect(url);
        const channel = await connect.createChannel();
        // Declare exchange
        // await channel.assertExchange(exchange, 'fanout')

        // publish
        await channel.publish(exchange, '', Buffer.from(msg));

        await channel.close();
        await connect.close();
    } catch (error) {
        console.log(error);
    }
}

async function receivedMessage(queueName) {
    try {
        const connect = await ampq.connect(url);
        const channel = await connect.createChannel();
        // Declare exchange
        await channel.assertQueue(queueName)

        //Bind
        await channel.bindQueue(queueName, exchange, '')

        await channel.consume(queueName, (msg) => {
            console.log(`Received message on queue ${queueName}: ${msg.content.toString()}`)
            channel.ack(msg);
        })

        await channel.close();
        await connect.close();
    } catch (error) {
        console.log(error);
    }
}



sendMessage(exchange, 'message 1')
sendMessage(exchange, 'message 2')

receivedMessage(queue1)
receivedMessage(queue2)