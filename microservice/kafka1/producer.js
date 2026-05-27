const { Kafka,Partitioners } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'greet',
    messages: [
      { value: 'Hello KafkaJS user! Code 2' },
      { value: 'Hello KafkaJS user! Code 3' },
      { value: 'Hello KafkaJS user! Code 4' },
      { value: 'Hello KafkaJS user! Code 5' },
    ],
  })

  
}

run().catch(console.error)