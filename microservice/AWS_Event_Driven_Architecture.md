# AWS Event-Driven Architecture Interview Guide

## SQS, SNS, EventBridge, FIFO, DLQs, Idempotency, and Saga Pattern

Senior-level interview preparation with simple explanations, practical
TypeScript examples, and real-world scenarios.

------------------------------------------------------------------------

## 1. What is Event-Driven Architecture (EDA)?

**Easy answer:** Event-driven architecture is a design where services
publish events when something happens, and other services react to those
events without needing a direct synchronous call.

Example: When an order is placed: 1. Order Service saves the order. 2.
It publishes `OrderPlaced`. 3. Payment Service processes payment. 4.
Inventory Service reserves stock. 5. Notification Service sends an
email.

The Order Service does not need to call every service directly.

**Benefits:** loose coupling, independent scaling, buffering,
resilience, and asynchronous processing.

**Trade-offs:** events may be delayed, duplicated, or out of order;
debugging is harder; schemas need versioning; data may be eventually
consistent.

**Interview line:** "I use EDA when services need loose coupling and
independent scaling. I explicitly design for retries, duplicate
delivery, idempotency, observability, and eventual consistency."

------------------------------------------------------------------------

## 2. SQS vs SNS vs EventBridge

### Easy way to remember

-   **SQS = Queue:** hold work until a consumer processes it.
-   **SNS = Fan-out:** send a notification to multiple subscribers.
-   **EventBridge = Event router:** route events to targets based on
    event content and rules.
```js
  -----------------------------------------------------------------------
  Capability        SQS               SNS               EventBridge
  ----------------- ----------------- ----------------- -----------------
  Primary purpose   Buffer work       Pub/sub fan-out   Rule-based event
                                                        routing

  Delivery model    Consumer polls    Pushes to         Routes matching
                    (pull)            subscribers       events to targets

  Multiple          Competing         Each subscription Multiple rules
  consumers         consumers share   gets a copy       can route to
                    queue work                          targets

  Buffering         Yes, durable work Not a durable     Has retry
                    queue             work queue by     policies and
                                      itself            optional DLQs for
                                                        supported
                                                        targets, but is
                                                        not a
                                                        general-purpose
                                                        queue

  Filtering         Consumer-side or  Subscription      Rich
                    supported queue   filter policies   event-pattern
                    filtering                           matching
                    features                            

  Ordering          FIFO can preserve FIFO topic        Do not rely on
                    order within a    supports ordering global ordering
                    message group     with supported    
                                      FIFO subscribers  

  Replay            Not a general     Not a general     Archives and
                    archive/replay    archive/replay    replay for
                    system            system            supported events

  Typical use       Background jobs,  Fan-out           Business events,
                    work buffers      notifications     SaaS/AWS
                                                        integration,
                                                        routing
  -----------------------------------------------------------------------
```
### When to use each

**Use SQS when** a worker must process each job, you need
buffering/backpressure, independent retries, and a DLQ.

**Use SNS when** one publisher must notify many subscribers through
push-based pub/sub.

**Use EventBridge when** events need routing based on fields such as
`source`, `detail-type`, or values inside `detail`; you need supported
SaaS/AWS integrations, event buses, schema discovery/registry, archives,
or replay.

### Common combinations

`Order Service → SNS Topic → Billing SQS Queue → Billing Worker`

SNS fans out the event; each SQS queue gives its consumer a durable
buffer and independent retry behavior.

`Service → EventBridge Bus → Rules → SQS / Lambda / Step Functions`

**Interview trap:** These services are not always alternatives. They
often complement one another.

------------------------------------------------------------------------

## 3. Standard vs FIFO SQS queues

  -----------------------------------------------------------------------
  Feature                 Standard                FIFO
  ----------------------- ----------------------- -----------------------
  Ordering                Best-effort; messages   Ordered within each
                          can arrive out of order `MessageGroupId`

  Delivery                At-least-once;          Queue-level
                          duplicates are possible deduplication reduces
                                                  duplicate sends within
                                                  the deduplication
                                                  interval; not
                                                  end-to-end exactly-once
                                                  effects

  Throughput              Very high, scales       Multiple message groups
                          broadly                 allow concurrency;
                                                  high-throughput mode
                                                  has configuration
                                                  constraints

  Deduplication           Consumer must handle    Explicit deduplication
                          duplicates              ID or content-based
                                                  deduplication

  Best for                Independent jobs, image Per-account/order
                          processing              sequencing where order
                                                  matters
  -----------------------------------------------------------------------

### What is `MessageGroupId`?

FIFO queues order messages **within the same message group**. Different
groups can be processed concurrently.

Example: - `MessageGroupId = customer-123`: events for this customer
stay ordered. - `MessageGroupId = customer-456`: this customer's
messages can progress independently.

Choose a grouping key based on the entity whose operations must be
ordered: `orderId`, `accountId`, or `customerId`. Avoid one global group
ID unless you intentionally want one serial processing lane.

### What is `MessageDeduplicationId`?

It identifies a message for FIFO send deduplication. Repeated sends with
the same ID within the deduplication interval are suppressed.
Content-based deduplication derives an ID from the message body. This
does not replace business-level idempotency.

### TypeScript AWS SDK v3 example

``` ts
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});

await sqs.send(new SendMessageCommand({
  QueueUrl: process.env.ORDERS_FIFO_QUEUE_URL!,
  MessageBody: JSON.stringify({
    eventId: "evt-123",
    orderId: "order-789",
    status: "PAYMENT_CONFIRMED"
  }),
  MessageGroupId: "order-789",
  MessageDeduplicationId: "evt-123"
}));
```

Use stable business/event identifiers, not random IDs generated on every
retry.

------------------------------------------------------------------------

## 4. Visibility timeout

**Definition:** After a consumer receives an SQS message, it becomes
temporarily invisible to other consumers while processing occurs.

If the consumer deletes the message before timeout, it is removed. If
processing fails or it is not deleted before timeout, it can become
visible again.

### Setting it for Lambda

AWS guidance commonly recommends setting the SQS visibility timeout to
**at least six times the Lambda function timeout**, plus the maximum
batching window where applicable. Check the current service guidance for
your exact trigger configuration.

Example: Lambda timeout = 30 seconds; baseline visibility timeout = at
least 180 seconds, plus any batching window if configured.

Too-short visibility can cause the same message to be processed
concurrently. For custom workers, extend visibility with
`ChangeMessageVisibility` if processing is still progressing.

**Interview answer:** "Visibility timeout reduces concurrent duplicate
processing, but it is not a lock or an exactly-once guarantee. I still
make the consumer idempotent."

------------------------------------------------------------------------

## 5. Dead-letter queues (DLQs) and `maxReceiveCount`

A DLQ stores messages that repeatedly fail, allowing investigation
without blocking normal work forever.

-   **Redrive policy:** defines when failed messages move to a DLQ.
-   **`maxReceiveCount`:** receive threshold after which SQS moves a
    repeatedly failing message to the DLQ under the configured policy.
-   **Redrive:** process DLQ messages again after fixing the cause.

### Good DLQ workflow

1.  Alarm when DLQ count becomes non-zero or crosses a threshold.
2.  Inspect payload, attributes, error logs, and correlation/event IDs.
3.  Fix the cause: invalid schema, dependency outage, bug, or bad data.
4.  Replay only after assessing side effects and idempotency.
5.  Track redrive success.

Do not set an arbitrarily huge `maxReceiveCount`. Choose it based on
expected transient failures, retry duration, and the cost of repeatedly
running a bad message.

**Remember:** A DLQ is a recovery mechanism, not a fix by itself.

------------------------------------------------------------------------

## 6. Lambda SQS batch processing and partial batch failures

By default, if a Lambda invocation fails while processing an SQS batch,
the batch can be retried. This can reprocess messages that already
succeeded.

**Partial batch response** lets the function report only failed messages
using `ReportBatchItemFailures`.

### TypeScript example

Enable the `ReportBatchItemFailures` response type on the Lambda event
source mapping.

``` ts
import type {
  SQSEvent,
  SQSBatchResponse,
  SQSRecord
} from "aws-lambda";

async function processRecord(record: SQSRecord): Promise<void> {
  const payload = JSON.parse(record.body) as {
    eventId: string;
    orderId: string;
  };

  await handleOrderEvent(payload); // Must be idempotent
}

export const handler = async (
  event: SQSEvent
): Promise<SQSBatchResponse> => {
  const batchItemFailures: SQSBatchResponse["batchItemFailures"] = [];

  await Promise.all(event.Records.map(async (record) => {
    try {
      await processRecord(record);
    } catch (error) {
      console.error("Failed to process SQS record", {
        messageId: record.messageId,
        error
      });

      batchItemFailures.push({
        itemIdentifier: record.messageId
      });
    }
  }));

  return { batchItemFailures };
};
```

### Implementation details

-   Configure the event source mapping with `ReportBatchItemFailures`;
    returning this structure alone is not enough.
-   `itemIdentifier` must be the SQS record's `messageId`.
-   Catch failures per record; an invocation-level error can cause the
    whole batch to fail.
-   `Promise.all` processes records concurrently. If FIFO ordering
    matters, process sequentially or follow FIFO partial-failure
    guidance so later messages in a group are not processed after an
    earlier failure.
-   Partial batch response reduces unnecessary retries but does not
    eliminate idempotency requirements.

**Interview line:** "I enable `ReportBatchItemFailures`, return only
failed message IDs, and make each handler idempotent so retries are
safe."

------------------------------------------------------------------------

## 7. SNS → SQS fan-out: why put SQS behind SNS?

``` text
                    ┌─> Billing SQS Queue ─> Billing Worker
Order Service ─> SNS Topic
                    ├─> Inventory SQS Queue ─> Inventory Worker
                    └─> Analytics SQS Queue ─> Analytics Worker
```

SNS sends a copy to each subscription. Each SQS queue buffers that copy
for its own consumer.

### Benefits

-   Independent scaling: consumers process at different rates.
-   Independent retry: one consumer's failure does not force other
    consumers to retry.
-   Durable buffering: messages wait while a consumer is unavailable.
-   Backpressure: queue depth absorbs bursts.
-   Per-consumer DLQs and alarms.
-   Loose coupling: producer publishes once.

Configure each queue as an SNS subscription and add an SQS queue policy
allowing `sqs:SendMessage` from the intended SNS topic ARN. Use
subscription filter policies where appropriate. Consider raw message
delivery if consumers should receive the original payload without the
SNS envelope.

**Caveat:** Design consumers for duplicate delivery.

------------------------------------------------------------------------

## 8. Can we guarantee exactly-once processing?

**Strong answer:** "Not end-to-end just by choosing SQS FIFO or another
messaging service. I design for at-least-once delivery and idempotent
consumers. FIFO deduplication helps at the queue boundary, but a
consumer can perform a side effect and crash before acknowledging the
message."

### Failure scenario

1.  Worker receives `PaymentRequested`.
2.  It charges the payment provider successfully.
3.  It crashes before deleting the SQS message.
4.  Message is delivered again.
5.  A naïve worker charges the customer twice.

### Idempotency pattern

1.  Receive event.
2.  Use a stable `eventId` or business operation key.
3.  Atomically claim the idempotency key in durable storage.
4.  If already completed, return success without repeating the side
    effect.
5.  Perform the operation with the provider's idempotency key where
    supported.
6.  Persist the result and completion state.
7.  Acknowledge/delete only after safe completion.

### DynamoDB conditional write concept

``` ts
import {
  DynamoDBDocumentClient,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

async function claimEvent(
  db: DynamoDBDocumentClient,
  tableName: string,
  eventId: string
): Promise<boolean> {
  try {
    await db.send(new PutCommand({
      TableName: tableName,
      Item: {
        eventId,
        status: "PROCESSING",
        createdAt: new Date().toISOString()
      },
      ConditionExpression: "attribute_not_exists(eventId)"
    }));
    return true;
  } catch (error) {
    // Distinguish ConditionalCheckFailedException from infrastructure errors.
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ConditionalCheckFailedException"
    ) {
      return false;
    }
    throw error;
  }
}
```

This is only the **claim** part of a complete design. Production code
must handle crashes while status is `PROCESSING` using lease
expiry/recovery, retry ownership, and completion state. Do not mark an
event complete before its business side effect.

### Best practices

-   Use stable idempotency keys at the business-operation boundary.
-   Prefer provider-supported idempotency keys for payments.
-   Use atomic conditional writes or transactions to prevent concurrent
    duplicate claims.
-   Keep records for the maximum replay/retry horizon.
-   Distinguish permanent validation errors from transient failures.
-   Use the transactional outbox pattern when a DB update and event
    publication must stay consistent.

**Remember:** Exactly-once business effects are approximated with
idempotency, atomic state transitions, and carefully designed external
side effects---not a magic delivery setting.

------------------------------------------------------------------------

## 9. EventBridge: content-based routing and schemas

An EventBridge event commonly contains `source`, `detail-type`, and
`detail`.

``` json
{
  "source": "commerce.orders",
  "detail-type": "OrderPlaced",
  "detail": {
    "orderId": "order-789",
    "total": 149.99,
    "country": "IN"
  }
}
```

A rule can route matching events---for example, orders where `country`
is `IN`---to a target. Event patterns match defined fields; they are not
arbitrary general-purpose query engines.

### Schema registry

Schema discovery can help discover event structures and maintain schemas
for supported event sources. Schemas improve documentation and can
support code bindings in supported workflows.

### SaaS and cross-account integration

EventBridge supports AWS services and supported SaaS partners. Event
buses and resource-based policies can enable cross-account event sharing
when permissions and account boundaries are configured correctly.

### Archives and replay

Archives can retain matching events for later replay. Replay helps with
recovery/backfills, but may repeat business effects; consumers must
remain idempotent.

**Interview trap:** EventBridge routing does not replace durable
per-consumer work queues when you need independent backlog control.
Route to SQS if each consumer needs its own buffer.

------------------------------------------------------------------------

## 10. Saga pattern and distributed transactions

A saga coordinates a business transaction spanning multiple services
without one global database transaction.

Example: travel booking: 1. Reserve flight. 2. Reserve hotel. 3. Charge
customer. 4. If hotel reservation fails after flight reservation, cancel
the flight reservation as a compensating action.

### Choreography vs orchestration
```js
  -----------------------------------------------------------------------
  Aspect                  Choreography            Orchestration
  ----------------------- ----------------------- -----------------------
  Coordination            Services react to       A central workflow
                          events                  coordinates steps

  Typical implementation  SNS/EventBridge +       AWS Step Functions or a
                          consumers               dedicated orchestrator

  Coupling                Services know event     Workflow explicitly
                          contracts               knows the sequence

  Visibility              Flow can be hard to     Central execution
                          trace across handlers   history

  Best for                Simple, loosely coupled Long-running workflows
                          reactions               with branches, retries,
                                                  timeouts, compensation

  Main risk               Hidden dependencies and Orchestrator can become
                          complex event chains    too central
  -----------------------------------------------------------------------
```
### Choreography example

``` text
OrderPlaced
   ├─> Inventory Service reserves stock → InventoryReserved
   └─> Payment Service charges customer → PaymentSucceeded

If PaymentFailed:
   └─> Inventory Service releases stock
```

Each service listens and emits events. Correlation IDs, state tracking,
and event contracts matter.

### Orchestration example

``` text
Start
  → Reserve Inventory
  → Charge Payment
  → Confirm Order
  → Notify Customer

On payment failure:
  → Release Inventory
  → Mark Order Failed
```

Step Functions can model steps, retries, catches, timeouts, and
compensation explicitly.

### Compensating actions

A compensation is a new business action that counteracts a completed
step: - `ReserveInventory` → `ReleaseInventory` - `ChargePayment` →
`RefundPayment` - `CreateBooking` → `CancelBooking`

Compensation is not always a perfect rollback. Refunds or cancellations
may have fees, and notifications cannot always be undone. Make
compensations idempotent and define their outcomes.

### Saga checklist

-   Assign a correlation ID / saga ID.
-   Persist saga state and step outcomes.
-   Define retryable versus permanent errors.
-   Add timeouts for stalled steps.
-   Make handlers and compensations idempotent.
-   Handle duplicate and out-of-order events.
-   Provide manual recovery for failed compensation.
-   Monitor saga age, failure rate, and stuck states.

**Interview line:** "I use choreography for simple event reactions and
orchestration with Step Functions when a workflow has dependent steps,
branching, timeouts, or compensating actions."

------------------------------------------------------------------------

## 11. Transactional outbox pattern

A service can update its database but fail to publish an event---or
publish an event while the database transaction rolls back.

The **outbox pattern** writes both the business change and an outbox
record in the same database transaction. A publisher reads pending
records, publishes events, and marks them published. The publisher can
send duplicates, so consumers still need idempotency.

``` text
Single DB transaction:
  UPDATE orders SET status = 'PLACED'
  INSERT INTO outbox(event_id, event_type, payload, status)

Publisher:
  Read pending outbox rows → publish event → mark published
```

This avoids assuming that a database write and message publication are
one atomic operation.

------------------------------------------------------------------------

## 12. Production scenario questions

### A. One consumer is down, but order creation must keep working

Publish the event and route to a dedicated SQS queue for that consumer.
The queue buffers backlog. Monitor queue depth, oldest-message age, and
DLQ count.

### B. The same payment event is processed twice

Use a stable operation ID, atomic idempotency state, and the payment
provider's idempotency key. Do not rely only on FIFO deduplication.

### C. One bad record causes a batch to retry repeatedly

Enable `ReportBatchItemFailures`, catch errors per record, return only
failed `messageId` values, and configure a DLQ/redrive policy.

### D. Events for a bank account must be ordered

Use FIFO SQS with `MessageGroupId` set to the account ID. Use stable
deduplication IDs and idempotent processing. Different accounts can
progress in separate groups.

### E. Several services must react to `OrderPlaced`, each with independent retries

Use SNS fan-out to a separate SQS queue per consumer. Each queue has its
own scaling, retry, DLQ, and alarms.

### F. A workflow reserves stock, charges payment, and creates shipment

Use a saga. Step Functions orchestration often fits because steps are
dependent and compensation is needed. Define retry/refund/manual
recovery for shipment failures.

### G. Events must be routed based on payload fields

Use EventBridge event bus rules. Route to SQS if the target needs an
independently managed backlog.

### H. Database save succeeds but event publish fails

Use the transactional outbox pattern or an equivalent integration
mechanism to atomically store the business update and intent to publish.

------------------------------------------------------------------------

## 13. Quick interview questions and short answers

**Q1. SQS vs SNS?**\
SQS buffers work for consumers to pull; SNS pushes a copy to multiple
subscribers.

**Q2. SNS vs EventBridge?**\
SNS is straightforward pub/sub fan-out; EventBridge is an event bus with
richer content-based routing and integrations.

**Q3. Why use SQS behind SNS?**\
Durable buffering, independent retries/scaling, and DLQ handling for
each subscriber.

**Q4. Standard or FIFO?**\
Standard for very high-throughput independent work; FIFO when ordering
and queue-level deduplication matter.

**Q5. Does FIFO guarantee my payment happens once?**\
No. It suppresses duplicate sends within its deduplication interval;
business side effects still need idempotency.

**Q6. What does visibility timeout do?**\
It temporarily hides a received message while it is processed.

**Q7. What is `maxReceiveCount`?**\
The configured receive threshold after which repeatedly failing messages
move to the DLQ.

**Q8. What does `ReportBatchItemFailures` solve?**\
It reports only failed SQS records so successful records need not be
retried because one record failed.

**Q9. How do you handle duplicate events?**\
Stable idempotency key, atomic durable state, and idempotent external
operations where possible.

**Q10. What is a saga?**\
A sequence of local transactions across services, with compensating
actions if a later step fails.

**Q11. Choreography or orchestration?**\
Choreography is decentralized and event-driven; orchestration uses a
central workflow to coordinate steps.

**Q12. Why use an outbox?**\
To avoid losing an event when the DB commits but publication fails, or
publishing for a transaction that rolls back.

**Q13. Can EventBridge guarantee global ordering?**\
Do not design around global ordering. For per-entity order, consider
FIFO SQS with a suitable message group.

**Q14. What should you monitor?**\
Queue depth, oldest-message age, visible/in-flight messages, DLQ depth,
Lambda errors/throttles/duration, delivery failures, retries, and saga
failures.

------------------------------------------------------------------------

## 14. Final 30-second revision

-   **SQS:** durable queue, pull-based consumers, buffering, retries,
    DLQ.
-   **SNS:** push-based pub/sub and fan-out.
-   **EventBridge:** event bus, content-based rules, integrations,
    schemas, archive/replay.
-   **Standard:** high scale, best-effort ordering, duplicates possible.
-   **FIFO:** order per message group and queue-level deduplication; not
    end-to-end exactly-once effects.
-   **Visibility timeout:** hide a message during processing; for
    Lambda, use AWS guidance relative to function timeout plus
    batching-window considerations.
-   **Partial batch failures:** return failed message IDs with
    `ReportBatchItemFailures`.
-   **Exactly-once effect:** at-least-once delivery + idempotency +
    atomic state transitions.
-   **SNS → SQS:** independent durable queue per subscriber.
-   **Saga:** local transactions plus compensation; choreography for
    simple flows, orchestration for complex flows.
-   **Outbox:** atomically store business change and event intent in one
    DB transaction.

### How to answer a system-design question

Explain the producer, event transport, per-consumer buffering, retry/DLQ
policy, idempotency key, ordering requirements, schema evolution,
observability, and replay/recovery plan. Tie every AWS service choice to
a concrete requirement.
