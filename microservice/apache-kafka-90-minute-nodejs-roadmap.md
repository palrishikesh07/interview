# Learn Apache Kafka in 90 Minutes -- Node.js + Express.js

A beginner-friendly, hands-on roadmap for learning Apache Kafka with
**Node.js, Express.js, TypeScript, and KafkaJS** instead of Spring Boot.

## Learning goals

By the end of this guide, you will understand Kafka's core architecture,
run Kafka locally with Docker, build a producer and consumer in Node.js,
integrate Kafka with Express, and understand how Kafka connects
microservices asynchronously.

------------------------------------------------------------------------

## 0--15 Minutes: Kafka Fundamentals

### What is Apache Kafka?

Apache Kafka is a distributed event-streaming platform. Applications
publish events to Kafka, and other applications consume those events
independently.

### Why do we need Kafka?

Without Kafka, services often communicate directly. This can create
tight coupling: if one downstream service is unavailable, the calling
service may also fail or become delayed.

With Kafka, a service publishes an event to a topic. Multiple
independent services can consume that event when they are ready.

### Kafka vs. traditional messaging

-   Kafka stores events for a configurable retention period, allowing
    consumers to read them later or replay them.
-   Traditional queues often focus on delivering a message to a consumer
    and removing or acknowledging it after processing.
-   Kafka is commonly used for event streaming, high-throughput data
    pipelines, and asynchronous microservice communication.

### Real-world use cases

-   Order and payment processing
-   Notifications
-   Activity tracking and analytics
-   Log aggregation
-   Inventory updates
-   Data synchronization between services

### Event-driven architecture

``` text
Without Kafka:

Order Service ---> Payment Service ---> Notification Service


With Kafka:

                  Order Service
                       |
                       v
                  Kafka Topic
                   /       \
                  v         v
          Payment Service  Notification Service
```

The Order Service does not need to know which services consume its
event.

------------------------------------------------------------------------

## 15--30 Minutes: Kafka Architecture

### Core concepts

  -----------------------------------------------------------------------
  Concept                             Explanation
  ----------------------------------- -----------------------------------
  Producer                            Application that publishes messages
                                      to Kafka

  Consumer                            Application that reads messages
                                      from Kafka

  Topic                               Named stream or category of events

  Partition                           Ordered, append-only log within a
                                      topic

  Broker                              Kafka server that stores and serves
                                      topic partitions

  Cluster                             Group of Kafka brokers

  Offset                              Position of a record within a
                                      partition

  Consumer Group                      Consumers that coordinate to
                                      process topic partitions

  Replication                         Copies of partitions maintained
                                      across brokers for fault tolerance
  -----------------------------------------------------------------------

### Topics and partitions

A topic can be split into multiple partitions so consumers can process
records in parallel.

``` text
Topic: orders

Partition 0: Order-101, Order-104
Partition 1: Order-102, Order-105
Partition 2: Order-103, Order-106
```

Ordering is guaranteed within a partition, not across all partitions in
a topic. Records with the same key are normally routed to the same
partition, which is useful when per-order ordering matters.

### Consumer groups

A consumer group allows multiple consumers to share the work of reading
a topic. Within a group, a partition is assigned to at most one consumer
at a time. If there are more consumers than partitions, some consumers
will be idle.

Different consumer groups can independently read the same topic. For
example, Payment Service and Notification Service should normally use
different group IDs so both receive each order event.

### Offsets

An offset identifies a record's position in a partition. Consumers use
offsets to track their progress. Committing an offset records the
consumer's progress so it can continue after a restart.

------------------------------------------------------------------------

## 30--45 Minutes: Core Kafka Concepts

1.  **Message ordering:** Kafka preserves record order within a
    partition.
2.  **Replication:** Replicas help keep data available when a broker
    fails. A single-broker local setup does not demonstrate production
    fault tolerance.
3.  **Retention:** Kafka retains records according to configured time or
    size limits, independently of whether a consumer has read them.
4.  **At-most-once delivery:** A record may be lost, but it is not
    intentionally processed again.
5.  **At-least-once delivery:** A record can be processed more than
    once. Consumers should be idempotent.
6.  **Exactly-once processing:** Kafka transactions can provide
    exactly-once semantics for certain Kafka-to-Kafka workflows.
    End-to-end exactly-once behavior involving external databases or
    payment providers requires additional design.
7.  **Idempotency:** Processing the same event more than once has no
    additional unwanted effect.
8.  **Dead Letter Queue (DLQ):** A separate topic used to hold messages
    that cannot be processed successfully after the retry policy.

------------------------------------------------------------------------

## 45--65 Minutes: Hands-On Kafka with Node.js

We will use:

-   Node.js
-   Express.js
-   TypeScript
-   KafkaJS
-   Docker Compose

### Step 1: Start Kafka using Docker

Create `docker-compose.yml`:

``` yaml
services:
  kafka:
    image: apache/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@localhost:9093
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      CLUSTER_ID: MkU3OEVBNTcwNTJENDM2Qk
```

Start Kafka:

``` bash
docker compose up -d
docker compose ps
```

This is a single-node development configuration. It is not a production
cluster and does not provide broker-level redundancy.

### Step 2: Create the Node.js project

``` bash
mkdir kafka-nodejs
cd kafka-nodejs

npm init -y

npm install kafkajs express dotenv
npm install -D typescript tsx @types/node @types/express
```

Create `tsconfig.json`:

``` json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

For a beginner-friendly project using `tsx`, you can also use a simpler
TypeScript configuration with `module: "ESNext"` and
`moduleResolution: "Bundler"`. Keep the module settings consistent with
your package configuration.

Suggested folder structure:

``` text
kafka-nodejs/
├── src/
│   ├── config/
│   │   └── kafka.ts
│   ├── producers/
│   │   └── order.producer.ts
│   ├── consumers/
│   │   └── order.consumer.ts
│   └── server.ts
├── .env
├── package.json
├── tsconfig.json
└── docker-compose.yml
```

### Step 3: Configure Kafka

Create `src/config/kafka.ts`:

``` typescript
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();

export const consumer = kafka.consumer({
  groupId: "order-consumer-group",
});
```

### Step 4: Create a topic

For a local Kafka container, create the topic using the Kafka CLI:

``` bash
docker exec kafka /opt/kafka/bin/kafka-topics.sh \
  --create \
  --topic orders \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1
```

List topics:

``` bash
docker exec kafka /opt/kafka/bin/kafka-topics.sh \
  --list \
  --bootstrap-server localhost:9092
```

### Step 5: Create the Kafka producer

Create `src/producers/order.producer.ts`:

``` typescript
import { randomUUID } from "node:crypto";
import { producer } from "../config/kafka";

type Order = {
  orderId: string;
  userId: string;
  amount: number;
};

export async function publishOrder(order: Order) {
  const event = {
    eventId: randomUUID(),
    eventType: "OrderCreated",
    data: order,
    createdAt: new Date().toISOString(),
  };

  await producer.send({
    topic: "orders",
    messages: [
      {
        // The key helps keep events for the same order on the same partition.
        key: order.orderId,
        value: JSON.stringify(event),
      },
    ],
  });

  console.log("Order event published:", order.orderId);
}
```

### Step 6: Create the Kafka consumer

Create `src/consumers/order.consumer.ts`:

``` typescript
import { consumer } from "../config/kafka";

export async function startOrderConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "orders",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }

      const event = JSON.parse(message.value.toString());

      console.log("Received event:", event);
      console.log("Topic:", topic);
      console.log("Partition:", partition);
      console.log("Offset:", message.offset);

      // In a real Payment Service, validate the event and process payment.
      // Make processing idempotent before performing business operations.
    },
  });
}
```

`fromBeginning: true` applies when the consumer group has no committed
offset for the partition. It does not mean the consumer replays all
records on every restart.

### Step 7: Integrate Kafka with Express

Create `src/server.ts`:

``` typescript
import express from "express";
import { randomUUID } from "node:crypto";
import { producer } from "./config/kafka";
import { publishOrder } from "./producers/order.producer";
import { startOrderConsumer } from "./consumers/order.consumer";

const app = express();

app.use(express.json());

app.post("/orders", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        message: "Valid userId and positive amount are required",
      });
    }

    const order = {
      orderId: randomUUID(),
      userId,
      amount,
    };

    await publishOrder(order);

    return res.status(201).json({
      message: "Order created and event published",
      order,
    });
  } catch (error) {
    console.error("Failed to publish order:", error);

    return res.status(500).json({
      message: "Failed to publish order event",
    });
  }
});

async function startServer() {
  await producer.connect();
  await startOrderConsumer();

  app.listen(3000, () => {
    console.log("Express server running on port 3000");
  });
}

startServer().catch((error) => {
  console.error("Application startup failed:", error);
  process.exit(1);
});
```

For this learning exercise, the producer and consumer run in the same
Node.js process. In a real microservices architecture, run them as
separate services and deploy them independently.

Run the application:

``` bash
npx tsx src/server.ts
```

### Step 8: Test with Postman or curl

Request:

``` http
POST http://localhost:3000/orders
Content-Type: application/json
```

Body:

``` json
{
  "userId": "USER101",
  "amount": 2500
}
```

Example response:

``` json
{
  "message": "Order created and event published",
  "order": {
    "orderId": "generated-order-id",
    "userId": "USER101",
    "amount": 2500
  }
}
```

The consumer should log the `OrderCreated` event.

------------------------------------------------------------------------

## 65--80 Minutes: Kafka with Express Microservices

Now separate the application into three independent Node.js services.

  -----------------------------------------------------------------------
  Service                             Responsibility
  ----------------------------------- -----------------------------------
  Order Service                       Creates orders and publishes
                                      `OrderCreated`

  Payment Service                     Consumes `OrderCreated`, processes
                                      payment, and publishes
                                      `PaymentCompleted` or
                                      `PaymentFailed`

  Notification Service                Consumes relevant events and sends
                                      notifications

  Inventory Service                   Consumes payment/order events and
                                      updates stock
  -----------------------------------------------------------------------

Architecture:

``` text
                         Client
                           |
                           v
                     Order Service
                           |
                           v
                      Kafka: orders
                       /         \
                      v           v
              Payment Service  Notification Service
                      |
                      v
               Kafka: payments
                      |
                      v
               Inventory Service
```

### Important implementation concepts

-   Give each independently interested service its own consumer group.
-   Use event IDs to identify duplicate events.
-   Make database updates idempotent.
-   Configure retry policies for transient failures.
-   Send repeatedly failing messages to a DLQ topic.
-   Handle graceful shutdown and disconnect Kafka clients.
-   Store Kafka broker addresses and credentials in environment
    variables.
-   Monitor consumer lag and processing failures.

------------------------------------------------------------------------

## 80--90 Minutes: Real-World Architecture

  -----------------------------------------------------------------------
  Concept                             Why it matters
  ----------------------------------- -----------------------------------
  Retry mechanism                     Recovers from temporary failures

  Dead Letter Queue                   Isolates messages that repeatedly
                                      fail

  Idempotency                         Prevents duplicate business
                                      operations

  Schema Registry                     Helps manage event schema evolution

  Outbox Pattern                      Prevents inconsistencies between
                                      database writes and event
                                      publishing

  Partition strategy                  Improves parallel processing and
                                      preserves related-event ordering

  Consumer lag                        Shows how far consumers are behind
                                      producers

  Kafka transactions                  Supports atomic Kafka operations in
                                      supported workflows
  -----------------------------------------------------------------------

### Example: The Outbox Pattern

A common problem is saving an order to a database and publishing an
event to Kafka as two separate operations. One operation may succeed
while the other fails.

The Outbox Pattern addresses this by writing the order and an event
record to the same database transaction. A separate publisher reads the
outbox and publishes events to Kafka, marking them as published.

------------------------------------------------------------------------

# Mini Project: Order Management System

Build an order management application using:

-   Node.js
-   Express.js
-   TypeScript
-   KafkaJS
-   MongoDB
-   Docker Compose

### Project workflow

1.  A user creates an order through the Order Service API.
2.  Order Service saves the order and an outbox event in MongoDB.
3.  An event publisher publishes `OrderCreated` to Kafka.
4.  Payment Service consumes `OrderCreated`.
5.  Payment Service processes payment and publishes `PaymentCompleted`
    or `PaymentFailed`.
6.  Inventory Service consumes the payment result and updates stock.
7.  Notification Service consumes the relevant event and sends an order
    confirmation or failure notification.

### Suggested Kafka topics

``` text
orders
payments
inventory
notifications
orders.dlq
payments.dlq
```

### Suggested event structure

``` json
{
  "eventId": "unique-event-id",
  "eventType": "OrderCreated",
  "eventVersion": 1,
  "createdAt": "2026-10-30T12:00:00.000Z",
  "data": {
    "orderId": "ORDER101",
    "userId": "USER101",
    "amount": 2500
  }
}
```

Use a versioned event contract so services can evolve without
unexpectedly breaking other consumers.

------------------------------------------------------------------------

# Learning Checklist

-   [ ] Understand Kafka fundamentals
-   [ ] Understand producers and consumers
-   [ ] Understand topics and partitions
-   [ ] Understand brokers and consumer groups
-   [ ] Understand offsets and replication
-   [ ] Understand delivery semantics
-   [ ] Install Kafka using Docker
-   [ ] Create a Kafka topic
-   [ ] Implement a Node.js producer
-   [ ] Implement a Node.js consumer
-   [ ] Integrate Kafka with Express
-   [ ] Build the Order Management mini project

------------------------------------------------------------------------

# Recommended Learning Resources

-   [Apache Kafka
    Documentation](https://kafka.apache.org/documentation/)
-   [KafkaJS Documentation](https://kafka.js.org/)
-   [Docker Documentation](https://docs.docker.com/)

## Final Recommendation

Do not stop after learning Kafka commands. Build three independent
Express microservices and follow the complete event flow:

`OrderCreated → PaymentCompleted → InventoryUpdated → NotificationSent`

This will help you understand Kafka in practice and prepare for senior
Node.js and microservices interviews.
