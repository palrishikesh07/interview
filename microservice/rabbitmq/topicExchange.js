const ampq = require('amqplib');

const url = 'amqp://guest:guest@localhost:5672'

const exchange = 'my_topic_exchange';

const queue1 = 'my_topic_queue_1'
const queue2 = 'my_topic_queue_2'

const routeKey1 = 'topic.a.*'
const routeKey2 = 'order.#'

async function sendMessage(exchange, routeKey, msg) {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        // Declare exchange
        await channel.assertExchange(exchange, 'topic')
        await channel.publish(exchange, routeKey, Buffer.from(msg));
        console.log(`Message sent to exchange ${exchange} with routeKey ${routeKey}: ${msg}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error);
    }
}
async function receiveMessage(queueName, routeKey) {
    try {
        const connection = await ampq.connect(url);
        const channel = await connection.createChannel();
        // Declare exchange
        await channel.assertQueue(queueName)

        await channel.bindQueue(queueName, exchange, routeKey);

        await channel.consume(queueName, (msg) => {
            console.log(`Received message on queue ${queueName} : ${msg.content.toString()}`)
            channel.ack(msg);
        })

    } catch (error) {
        console.log(error);
    }
}


sendMessage(exchange, routeKey1, 'Message from routing key 1 messsage 1')
sendMessage(exchange, routeKey2, 'Message from routing key 2 messsage 1')

receiveMessage(queue1, routeKey1)
receiveMessage(queue2, routeKey2)
