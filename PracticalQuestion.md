### When designing a Node.js backend for high-concurrency data writes, how would you handle potential race conditions or database deadlocks during a critical update sequence?
- In a high-concurrency Node.js backend, I would make critical database updates atomic and transactional. 
- For MySQL, I would use transactions with appropriate row-level locking such as SELECT ... FOR UPDATE, keep transactions short, and ensure updates happen in a consistent order to reduce deadlocks. 
- I would also enforce database constraints and make APIs idempotent so duplicate requests don't create inconsistent data. - For transient deadlocks, I would use controlled retries with exponential backoff and proper logging/monitoring.

### In an AWS serverless architecture, how would you resolve a situation where a Lambda function is timing out due to a downstream dependency's slow response?

- First, I would identify whether the bottleneck is an external API, database, or another AWS service using CloudWatch metrics/logs and tracing. 
- I would avoid keeping Lambda synchronously blocked on a slow downstream dependency wherever possible. 
- For example, I would move long-running work to SQS/EventBridge and process it asynchronously with another Lambda. 
- I would also configure connection timeouts, retries with exponential backoff, circuit breakers where applicable, and use caching or connection reuse to reduce latency.

### How would you restructure a legacy codebase's test suite if you discovered that integration tests are too slow and flaky to provide a reliable CI/CD signal?
- I would first analyze the test suite and identify the slowest and most frequently failing tests. 
- I would restructure it into a testing pyramid: unit tests for business logic, integration tests for database/service boundaries, and a smaller number of end-to-end tests.
- For CI/CD, I would run fast unit tests on every commit and run integration/E2E tests in dedicated stages. 
- I would also isolate test data, mock unstable external dependencies, remove unnecessary setup/teardown, and run independent tests in parallel. 
- This gives the CI pipeline a much more reliable signal while still maintaining meaningful integration coverage.

### How would you optimize an AWS-based real-time data pipeline to reduce end-to-end latency when processing a sudden spike in incoming events?
- For a real-time AWS pipeline, I would introduce a buffering layer such as SQS or Kafka between producers and consumers. - - This prevents a sudden traffic spike from overwhelming downstream services.
- I would configure Lambda concurrency appropriately, process events in batches, optimize database writes, and use dead-letter queues for failed messages. 
- I would monitor metrics such as queue depth, processing latency, Lambda duration, and error rate through CloudWatch. 
- The goal would be to improve throughput without sacrificing reliability or causing downstream overload.

### Can you walk through a real scenario where you applied React in Full-Stack Architecture & State Management and explain one key decision you made?
- In one of my full-stack applications, I used React with TypeScript on the frontend and Node.js/Express on the backend.
- The frontend consumed REST APIs and had multiple screens sharing common application state.
- A key decision was to use Redux Toolkit for shared state instead of keeping everything inside individual components. 
- I separated server/API state from local UI state and structured Redux slices around business domains.
- This made state changes predictable, reduced prop drilling, and made the application easier to maintain as the number of features increased.

### Can you walk through a real scenario where you applied NoSQL - Database Management in Scalable Data Persistence & Backend Logic and explain one key decision you made?
- I have worked with MongoDB for applications where flexible schemas and scalable document-based persistence were useful. - - One important decision was to design the MongoDB schema based on access patterns rather than simply normalizing the data like a relational database.
- For frequently accessed data, I preferred embedding related information where appropriate to reduce multiple database calls. 
- For large collections, I focused on proper indexing and query optimization. I also used MongoDB aggregation when filtering, grouping, or transforming data could be efficiently handled at the database layer.

### How would you use CI/CD in Cloud Infrastructure & Serverless Orchestration to solve a practical day-to-day problem?
- A practical use case is automating deployment of Node.js/serverless applications.
- I would configure a CI/CD pipeline using Jenkins or Git-based CI/CD so that every approved change automatically goes through linting, unit tests, build, security checks, and deployment.

- For AWS serverless infrastructure, I would use infrastructure-as-code such as Terraform and maintain separate environments such as development, staging, and production.
- This reduces manual deployment errors and gives the team a repeatable way to release changes and roll back when necessary.

### Can you walk through a real scenario where you applied Team Leadership in Engineering Excellence & Quality Assurance and explain one key decision you made?
- As a Senior Software Engineer/Tech Lead, I have been involved in technical discussions, code reviews, task breakdown, mentoring, and maintaining engineering standards.
- One key decision I made was to introduce stronger code review and automated testing practices rather than relying only on manual verification.
- I encouraged developers to follow consistent TypeScript/JavaScript coding standards, write unit/integration tests for important business logic, and use CI pipelines to catch issues before deployment. 
- This improved code quality while reducing production-related issues.

### Can you walk through a real scenario where you applied System Design in Full-Stack Architecture & State Management and explain one key decision you made?
- For a scalable full-stack application, I would separate the system into frontend, API/backend, database, caching, and asynchronous processing layers. 
- In my Node.js-based architecture, the backend exposes APIs through Express/Node.js, with MySQL/MongoDB used depending on the data requirements.
- One key design decision is to keep the API layer stateless and move long-running or asynchronous workloads to messaging services such as SQS/SNS/EventBridge. 
- This allows the application to scale horizontally and prevents slow background operations from blocking user-facing API requests.

- I would also add proper authentication/authorization, database indexing, caching where required, centralized logging/monitoring, and CI/CD automation to make the system production-ready.

## NodeJS
- 1. Identify → 2. Investigate → 3. Fix → 4. Prevent
### Your Node.js API suddenly starts returning high latency under heavy traffic. How would you investigate and fix it?
- First, I would check metrics like CPU, memory, request latency, throughput, and error rate using CloudWatch or application monitoring. 
- Then I would identify whether the bottleneck is in Node.js, the database, or an external service.
- I would check slow database queries, connection-pool saturation, event-loop blocking, and downstream API latency. - Depending on the bottleneck, I would optimize queries and indexes, add caching, increase Node.js instances using PM2 cluster mode/ECS, and move heavy asynchronous work to a queue such as SQS.

### A Node.js service is consuming 100% CPU in production. What would you check first?
- I would first check whether the event loop is blocked by CPU-intensive or synchronous operations.
- I would check production metrics, CPU usage by process, event-loop lag, and application logs. 
- Then I would use profiling tools such as Node.js inspector or CPU profiles to identify the expensive function.
- Clinic.js is a specialized external suite of performance profiling tools designed to diagnose complex performance issues like CPU bottlenecks, memory leaks, and asynchronous operation delays.

- If the workload is CPU-intensive, I would move it to worker threads or a separate service. 
- If the problem is traffic-related, I would scale horizontally instead of allowing one Node.js process to handle everything.

### Your API works correctly locally but starts crashing under production load. How would you debug it?
- I would first reproduce the issue using load testing and check production logs, memory usage, CPU, event-loop latency, database connections, and external service failures.

- I would also check differences between local and production configuration, such as environment variables, connection limits, timeouts, and resource limits.

- If memory or connection exhaustion is involved, I would fix the root cause and then validate the solution with load testing before deploying again.

### How would you design a Node.js API that can handle 10,000+ concurrent requests?
- I would keep the Node.js application stateless so it can scale horizontally behind a load balancer.
- I would use asynchronous I/O, connection pooling, database indexes, caching such as Redis where appropriate, and avoid CPU-heavy work inside the request path. 
- For background processing, I would use SQS/Kafka instead of blocking API requests.
- I would also configure autoscaling, rate limiting, monitoring, health checks, and proper timeouts.

### Two API requests update the same record at almost the same time. How would you prevent lost updates?
- I would use database-level concurrency control rather than relying only on Node.js code.

- Depending on the use case, I could use a transaction with row-level locking, for example SELECT ... FOR UPDATE, or use optimistic locking with a version column.
```JS
START TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1 FOR UPDATE;
-- Exclusive lock acquired; other transactions wait
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;   
```
- For example, the update can happen only when the current version matches the version the client originally read. 
- If another request has already updated it, the second request fails and can retry or return a conflict response.

### Your API occasionally returns duplicate records because clients retry requests. How would you make the API idempotent?

- For operations such as payments or order creation, I would introduce an idempotency key.
- The client sends a unique key with the request. 
- The backend stores that key along with the operation result using a unique database constraint. If the same request arrives again with the same key, I return the previously stored result instead of creating another record.
- This is especially important for APIs where clients or gateways automatically retry requests.

### A third-party API your service depends on becomes unavailable. How would you prevent it from bringing down your  application?
- I would use timeouts, limited retries with exponential backoff, and a circuit breaker.
- I would avoid retrying indefinitely because that can make the situation worse. 
- If the dependency is unavailable, the <b>circuit breaker</b> can temporarily stop requests to it and allow the system to recover.

- For non-critical operations, I would move the work to SQS/EventBridge and process it asynchronously. 
- I would also provide a fallback response or cached data when possible.

### Your Node.js application has a memory leak. How would you identify and resolve it?
- First, I would confirm the problem by monitoring <b>heap usage and garbage collection</b> behavior over time. 
- If memory continuously increases and doesn't return after GC, I would investigate further.
- I would take heap snapshots and compare them to identify objects that are being retained unexpectedly. 
- Common causes include global variables, unbounded caches, event listeners that aren't removed, timers, and large objects retained by closures.
- After fixing the leak, I would run load tests and monitor memory over a longer period to confirm the fix.

### An API endpoint is taking 5–10 seconds even though the database query looks simple. How would you troubleshoot it?
- I wouldn't assume the database is the only problem. I would trace the complete request flow.
- I would check database execution time, connection-pool wait time, external API calls, serialization, middleware, and event-loop delays.
- I would use logs/tracing to measure each step. 
- If the DB query itself is slow, I would check EXPLAIN, indexes, and execution plans. 
- If the DB takes 50ms but the API takes 8 seconds, I would investigate connection pools or downstream services instead.

### How would you handle graceful shutdown of a Node.js application during deployment?
- I would listen for signals such as SIGTERM. When the signal is received, the application should stop accepting new requests but allow existing requests to finish.

- Then I would close HTTP connections, database connections, message consumers, and other resources cleanly. 
- I would also configure a reasonable shutdown timeout so the process doesn't remain stuck indefinitely.

- In a containerized environment such as ECS/Kubernetes, I would combine this with proper health checks and deployment configuration so traffic is removed from the instance before it terminates.


## Database / MySQL

### A production MySQL query that previously took 100ms now takes 5 seconds. How would you investigate?
- First, I would check whether the data volume, traffic, or query itself has changed.
- I would look at the slow query logs, execution time, CPU, locks, and connection pool. 
- Then I would run EXPLAIN or EXPLAIN ANALYZE to check whether MySQL is still using the expected index.

- I would also check if the query plan changed, statistics are outdated, or another transaction is holding a lock.
- Based on the root cause, I might add or modify an index, optimize the query, or fix the locking issue.

### Your database CPU reaches 90–100% during peak traffic. What would you do?
- First, I would identify which queries are consuming most of the CPU rather than immediately increasing database capacity.
- I would check slow queries, expensive joins, missing indexes, full table scans, connection count, and concurrent transactions.
- If the queries can be optimized, I would fix them first. For read-heavy workloads, I could introduce caching or read replicas. 
- If traffic is still growing after optimization, I would consider scaling the database infrastructure.
- The important thing is to find the bottleneck before simply adding more resources.

### How would you identify whether a query needs a new index?
- I would start with EXPLAIN or EXPLAIN ANALYZE.

- I would look for things like full table scans, high rows examined, inefficient joins, and filters that are not using indexes.

I would also consider the actual query pattern. For example, if I frequently query:
```js
SELECT * FROM orders
WHERE customer_id = ? AND status = ?;

// I might consider a composite index such as:
INDEX(customer_id, status)
```
- But I would verify the improvement with execution plans and production-like data before adding the index

### Adding indexes improves reads but makes writes slower. How would you decide which indexes to keep?
- Indexes have a cost because every INSERT, UPDATE, and DELETE may also need to update the indexes.
- So I would look at how frequently each query is executed and how important it is.
- I would keep indexes that significantly improve important/high-frequency queries and remove redundant or rarely-used indexes.
- I would also avoid creating multiple overlapping indexes without a reason. The goal is to find a balance between read performance and write performance.

### Two transactions are frequently causing deadlocks. How would you identify and fix the problem?


### Your application needs to update multiple tables atomically. How would you design the transaction?
- I would use a database transaction so either all changes succeed or all changes are rolled back.
- For example:

```Js
BEGIN

Update order
Update payment
Update inventory

COMMIT

If any operation fails:

ROLLBACK
```

- In Node.js, I would use the database driver's transaction support and make sure the transaction is kept as short as possible.
- I would also avoid external API calls inside the database transaction because that can keep database locks open for too long.

### A table has grown from 10 million to 500 million records. How would you scale it?
- First, I would understand the access patterns and identify whether the problem is storage, query performance, or write throughput.

- I would optimize indexes and queries first. For very large datasets, I would consider partitioning, especially when records can naturally be divided by date or another key.

- I could also archive old data that is no longer frequently accessed. 
- For read-heavy workloads, read replicas can help.
- If the workload eventually exceeds what a single database can handle, I would consider sharding, but only when necessary because it adds significant application and operational complexity.

### How would you handle database migrations when the application has zero-downtime requirements?
- I would avoid making a breaking schema change in a single deployment.
- I normally follow an expand-and-contract approach.

- For example, if I need to add a new column:

Step 1: Add the new column without breaking the existing application.

Step 2: Deploy application code that can work with both old and new structures.

Step 3: Start writing the new data.

Step 4: Migrate/backfill existing data gradually.

Step 5: Once everything is using the new structure, remove the old column/code.

- This allows old and new application versions to coexist during deployment.

### How would you implement pagination for a very large dataset?
- For small datasets, offset pagination is simple:
 - LIMIT 20 OFFSET 10000

- But for very large tables, large offsets can become expensive because the database may need to scan and skip many records.

- I would prefer cursor/keyset pagination.

For example:
```js
SELECT *
FROM orders
WHERE id > ?
ORDER BY id
LIMIT 20;
```
- The API returns the last ID as a cursor for the next request.

- This performs much better for large datasets when the cursor column is properly indexed.

### When would you choose read replicas over database sharding?
- I would choose read replicas when the primary problem is high read traffic.

```js
For example:

Application
     |
     +----> Primary DB  ---> Writes
     |
     +----> Read Replica --> Reads

This is relatively simple and works well for read-heavy applications.
```
- I would consider sharding when the data volume or write workload has grown beyond what a single database instance can handle.

- Sharding distributes the data across multiple database instances, but it introduces additional complexity around data distribution, cross-shard queries, transactions, and operational management.

- So my preference would be:

- Optimize → Index → Cache → Read Replica → Sharding when necessary.


## MongoDB/ NoSQL

### Your MongoDB collection has millions of documents and queries are becoming slow. How would you optimize it?
- First, I would identify which queries are slow and check their execution plans using explain().
- I would look for collection scans, large numbers of documents examined, inefficient filters, and missing indexes. Then I would create indexes based on the actual query patterns.
- I would also check whether the application is returning too much data and use projection and pagination where appropriate. If the workload is still large, I would consider caching, read scaling, or sharding.

- My approach would be:
- Measure → Explain → Index → Optimize query → Monitor → Scale if required.

### How would you decide between embedding and referencing documents in MongoDB?

- I mainly decide based on how the application reads the data.

- If related data is usually accessed together and doesn't grow too much, I prefer embedding.
```js
For example:

User
 └── addresses[]

This allows me to retrieve the user and addresses in one query.
```

- If the related data is large, frequently updated independently, or shared by many documents, I prefer referencing.
```js
For example:

Order → customerId
```
- So I don't blindly normalize everything. I design the MongoDB schema based on the application's access patterns.

### A MongoDB query is performing a collection scan. How would you troubleshoot it?
- First, I would run:
```js
db.orders.find({
  customerId: "123"
}).explain("executionStats")
```
- I would check whether MongoDB is doing a COLLSCAN instead of an index scan.

- Then I would check the query fields and existing indexes. 
- If customerId is frequently used for filtering, I might create:
```js
db.orders.createIndex({ customerId: 1 })
After creating the index, I would run explain() again and compare documents examined, execution time, and query plan.
```
- I would also check whether the query is actually selective enough to benefit from an index.

### How would you design MongoDB indexes for a high-read application?
- I would design indexes based on the most frequent and performance-critical queries, rather than indexing every field.
- For example, if the application frequently does:
```js
{
  customerId: 123,
  status: "ACTIVE"
}

and sorts by creation date, I might consider:

{ customerId: 1, status: 1, createdAt: -1 }
```
- I would also consider the order of fields in compound indexes, query selectivity, sorting requirements, and index size.

- I would regularly review index usage and remove unused or redundant indexes because indexes also have a cost on writes and memory.

### Your MongoDB document is becoming extremely large. How would you redesign the schema?
- First, I would identify which part of the document is growing.
- A common problem is storing an unbounded array inside a document.
- For example, if an order document keeps thousands or millions of events:
```js
Order
 └── events[]
```
- I would move those events into a separate collection:
```js
orders
order_events

 and reference the order using orderId.
```
- This keeps the main document small and allows the event collection to grow independently.

- I would also use pagination and indexes when reading the related data.

### When would you choose MongoDB over MySQL for a new service?
- I would choose MongoDB when the application benefits from a flexible document model, the schema can evolve frequently, and the data is naturally represented as documents.

- For example, content management, product catalogs with varying attributes, event data, or certain user-profile systems can fit well with MongoDB.

- I would prefer MySQL when I need strong relational relationships, complex joins, strict transactional requirements, or highly structured financial/business data.

- So I don't choose MongoDB just because it's NoSQL. I choose it based on data structure, access patterns, consistency requirements, and scalability needs.
### How would you handle concurrent updates to the same MongoDB document?

- First, I would determine whether the updates can safely happen independently.

- For simple atomic updates, I would use MongoDB's atomic operators such as:
```js
$set
$inc
$push

For example:

db.products.updateOne(
  { _id: productId },
  { $inc: { stock: -1 } }
);
```

- If I need to make sure that I don't overwrite someone else's changes, I can use optimistic concurrency with a version field.

- For more complex operations involving multiple documents, I would consider a MongoDB transaction.

- The important point is that I would not rely on Node.js application-level locking alone because multiple Node.js instances may be running.

### How would you design a MongoDB collection for a high-volume event/logging system?

- For a high-volume event system, I would keep the event documents relatively small and design the collection around the primary query patterns.

- A document could look like:
```js
{
  eventType: "USER_LOGIN",
  userId: "123",
  service: "auth-service",
  timestamp: ISODate(),
  metadata: {
    ip: "...",
    device: "..."
  }
}
```
- I would index fields that are actually used for searching, such as:
```js
{ userId: 1, timestamp: -1 }

or:

{ service: 1, timestamp: -1 }
```

- For very large volumes, I would consider time-based partitioning/collection strategies, TTL indexes for temporary logs, archiving, and sharding depending on the retention and query requirements.

- I would also avoid sending every event directly from the application into MongoDB during traffic spikes. I would preferably put a Kafka/SQS buffering layer in front so MongoDB is protected from sudden bursts.

- 1. Check query → 2. explain() → 3. Check indexes → 4. Optimize schema/query → 5. Monitor → 6. Scale
### How do you optimize a slow MongoDB query

- First I would reproduce the query and use explain('executionStats') to understand what MongoDB is actually doing. 
- I would check for collection scans, documents examined, index usage, and execution time. 
- Then I would optimize the query or add a suitable compound index based on the actual access pattern. 
- After the change, I would run explain again and validate the improvement with production-like data. 
- If the workload is still too high, then I would look at caching, read scaling, or sharding.

## AWS


### A Lambda function works normally but starts timing out during peak traffic. How would you investigate?
- First, I would check CloudWatch metrics like Duration, Errors, Throttles and ConcurrentExecutions. 
-I would verify whether Lambda is hitting its concurrency limit or whether downstream services like RDS, APIs or DynamoDB are becoming slow. 
- Then I would check CloudWatch logs and X-Ray traces to identify where the time is being spent. 
- If concurrency is the problem, I would tune reserved/provisioned concurrency and optimize the downstream dependencies.

- Keywords: CloudWatch → Duration → Throttles → Concurrency → Downstream services → X-Ray

### Your Lambda has a cold-start problem that affects API latency. How would you reduce it?
- I would first identify whether cold starts are actually causing the latency using CloudWatch or X-Ray. 
- Then I would reduce the deployment package size, remove unnecessary dependencies and initialize only what is required. -  - For APIs where low latency is critical, I would use <b>Provisioned Concurrency</b> so Lambda instances are already initialized. 
- I would also choose an appropriate runtime and memory configuration.
- Simple line to remember:
- Small package + lazy initialization + Provisioned Concurrency.

### A Lambda calls an external API that sometimes takes 20 seconds. How would you redesign the architecture?
- I would avoid keeping the API request waiting for 20 seconds. 
- Instead, I would make the operation asynchronous. 
- The API can put a job into SQS, return a job ID to the client, and a Lambda consumer processes the external API call in the background. T
- The client can then check the job status or receive a notification when processing is completed.
- Architecture:
```js
Client
   ↓
API Gateway
   ↓
Lambda
   ↓
SQS
   ↓
Lambda Worker
   ↓
External API
```
- This improves API responsiveness and protects the system from slow external dependencies.


### Your Lambda is processing the same SQS message multiple times. How would you handle duplicate processing?
- SQS provides at-least-once delivery, so duplicate messages are possible. 
- I would make the Lambda processing idempotent. 
- For example, I would use a unique transaction ID or message ID and store the processing status in DynamoDB or the database. 
- Before processing, Lambda checks whether the message was already processed. If yes, it skips it.
- Interview keyword:
- Idempotency + Visibility Timeout + DLQ

### Your SQS queue keeps growing faster than Lambda can process messages. What would you check?
- First, I would check the ApproximateNumberOfMessagesVisible metric and Lambda concurrency. 
- I would check whether Lambda is being throttled, whether each invocation is taking too long, or whether downstream services are limiting throughput. 
- Then I would increase concurrency carefully, optimize the Lambda processing time, and consider increasing the batch size if appropriate.

- Lambda errors
- Lambda duration
- SQS visibility timeout
- Reserved concurrency
- Downstream database/API limits
- DLQ messages
- I would find the bottleneck first rather than simply increasing Lambda concurrency.

### How would you design a fault-tolerant Lambda + SQS architecture?
- I would put SQS between the producer and Lambda so traffic can be buffered. 
- Lambda consumes messages asynchronously. 
- I would configure retries, visibility timeout and a Dead Letter Queue for messages that repeatedly fail. 
- The Lambda processing would be idempotent, and I would monitor queue depth, errors, throttles and DLQ messages using CloudWatch.
```js
Producer
   ↓
  SQS
   ↓
Lambda
   ↓
Database / External Service
   ↓
Success

Failed repeatedly
   ↓
  DLQ
```
- For critical systems, I would also consider multi-AZ services and appropriate backup/recovery strategies.

### When would you use SQS vs SNS vs EventBridge?
```js
| Service         | Use it when                                                         |
| --------------- | ------------------------------------------------------------------- |
| **SQS**         | You need a queue and reliable asynchronous processing               |
| **SNS**         | You need to broadcast one message to multiple subscribers           |
| **EventBridge** | You need event-driven architecture and routing based on event rules |

```
SQS:
- Order processing needs to happen asynchronously.
- ``` Order → SQS → Worker```

SNS:
- One order event needs to notify multiple systems.
```
              → Email
Order → SNS  → Analytics
              → Notification
```
EventBridge:
- Different AWS services need to react to business events.
```js
OrderCreated
     ↓
EventBridge
 ├── Payment
 ├── Inventory
 └── Notification
```
- Easy memory trick
```js
SQS = Queue
SNS = Broadcast
EventBridge = Event routing
```
### Your AWS application suddenly receives 10x normal traffic. How would you ensure it remains available?
- I would make sure the architecture is horizontally scalable and does not depend on a single server. 
- For serverless applications, Lambda automatically scales, but I would check concurrency limits and downstream service limits. 
- I would use API Gateway throttling, caching where appropriate, SQS for asynchronous workloads, and autoscaling for services such as databases or ECS.
- Scaling Lambda is usually not enough; I also need to make sure the database and downstream dependencies can handle the increased load.

### How would you monitor a production serverless application?
- I would use CloudWatch as the primary monitoring solution. 
- I would monitor Lambda duration, errors, throttles, concurrency and invocation count. 
- For API Gateway, I would monitor latency, 4xx and 5xx errors. 
- For SQS, I would monitor queue depth and message age. 
- I would configure CloudWatch alarms and dashboards, and use X-Ray for distributed tracing when I need to troubleshoot latency across services.

- Monitoring structure
```js
Lambda
 ├── Errors
 ├── Duration
 ├── Throttles
 └── Concurrency

API Gateway
 ├── Latency
 ├── 4xx
 └── 5xx

SQS
 ├── Queue depth
 ├── Message age
 └── DLQ

CloudWatch
 ├── Logs
 ├── Metrics
 ├── Alarms
 └── Dashboard
```

### How would you troubleshoot an AWS Lambda that works in development but fails in production?
- First, I would check the CloudWatch logs for the exact error. 
- Then I would compare development and production configuration, especially environment variables, IAM permissions, VPC configuration, security groups, networking and external service endpoints. 
- I would also check whether the production Lambda has the required dependencies and correct runtime configuration.
- My debugging order:
```js
1. CloudWatch Logs
2. Exact error
3. Environment variables
4. IAM permissions
5. VPC / Security Groups
6. Runtime & dependencies
7. External services
8. Production data
```
### How would you securely manage secrets and environment variables in AWS?
- I would never hardcode secrets in the source code or commit them to Git. 
- For sensitive values such as database passwords and API keys, I would use AWS Secrets Manager or SSM Parameter Store. - Lambda would retrieve the secret at runtime using an IAM role with least-privilege permissions.
- Normal non-sensitive configuration can be stored as Lambda environment variables.
- Example
```js
Lambda
   ↓
IAM Role
   ↓
Secrets Manager
   ↓
Database Password
```
- I would also enable encryption and rotate secrets where required.
- Important interview point:
- Environment variables are configuration; they should not become a place to hide sensitive credentials without proper encryption and access control.

### How would you design a serverless application requiring long-running background processing?

- I would not keep a Lambda running for a long operation. 
- I would use Lambda for orchestration or triggering and move the long-running work to a service designed for it, such as ECS/Fargate, AWS Batch, or Step Functions depending on the workflow.

```js
API Gateway
     ↓
  Lambda
     ↓
    SQS
     ↓
ECS/Fargate Worker
     ↓
Long-running Processing
     ↓
Database / S3
```
- If the processing consists of multiple steps, retries and branching, I would consider Step Functions.

```js
Lambda timeout
Check Duration → Throttles → Concurrency → Downstream dependencies → CloudWatch/X-Ray

Lambda cold start
Reduce package → Lazy initialization → Provisioned Concurrency

Slow external API
Make it asynchronous → SQS → Worker Lambda

Duplicate SQS messages
Idempotency + Visibility Timeout + DLQ

SQS backlog
Check consumer throughput, concurrency, duration and downstream bottlenecks

Fault tolerance
SQS + Lambda + Retry + Idempotency + DLQ + CloudWatch

SQS vs SNS vs EventBridge

SQS = Queue
SNS = Broadcast
EventBridge = Event Routing

10x traffic
Auto scaling + throttling + caching + queue buffering + protect downstream systems

Monitoring
CloudWatch + Logs + Metrics + Alarms + X-Ray

Dev vs Prod failure
Logs → Config → IAM → Network → Dependencies → Production data

Secrets
Secrets Manager / SSM + IAM least privilege

Long-running processing
SQS + ECS/Fargate or Step Functions
```

## Real-Time / Event-Driven Architecture
- Producer → Buffer → Consumer → Retry → DLQ → Idempotency → Monitoring

### Your application receives 100,000 events within a few seconds. How would you design the system to handle the spike?
- I would avoid sending all events directly to the processing service. 
- I would put a durable messaging system such as Kafka or SQS between producers and consumers. 
- The queue or topic acts as a buffer and absorbs the traffic spike. 
- Consumers can then process messages in parallel by increasing the number of consumers or partitions. 
- I would also monitor queue depth and consumer lag and scale consumers based on the backlog.
```js
100,000 Events
      ↓
   Producer
      ↓
   Kafka / SQS
      ↓
 ┌────┼────┬────┐
 ↓    ↓    ↓    ↓
C1   C2   C3   C4
 ↓    ↓    ↓    ↓
Database / Services
```
- Can the messaging system handle the throughput?
- Consumer throughput
- Kafka consumer lag / SQS queue depth
- Database capacity
- Network limits
- Consumer concurrency
- Backpressure

### How would you guarantee that an important event is not lost?
- This is a tricky question because "guarantee" is a strong word.
- I would use a durable messaging system and acknowledge the event only after it has been safely persisted or successfully processed according to the business requirement. 
- I would configure appropriate replication, retries and dead-letter handling. 
- For critical workflows, I would also use idempotent consumers and monitoring to detect failures.
```js
Producer
   ↓
Kafka
   ↓
Replicated Partitions
   ↓
Consumer
   ↓
Commit Offset

Eg.

Producer
   ↓
Kafka
   ↓
Replicated Partitions
   ↓
Consumer
   ↓
Commit Offset

```

### How would you handle events that arrive out of order?
- Suppose events arrive:
```
OrderCreated
OrderCancelled
OrderUpdated
```
- But consumer receives:
```
OrderCreated
OrderUpdated
OrderCancelled

```
- I would first determine whether ordering is actually required for that event. 
- If ordering matters, I would partition messages using a business key such as orderId, so events for the same order go to the same partition. 
- I would also include a sequence number or event version and reject or delay stale events.
```js
{
  "orderId": "ORD123",
  "eventType": "OrderUpdated",
  "version": 5
}
If version 4 arrives after version 5:
Current version = 5
Incoming version = 4

Ignore / delay event

orderId = 100 → Partition 1
orderId = 101 → Partition 2
orderId = 102 → Partition 3

```
- Partition by the entity whose ordering matters.
- Events for the same order remain ordered.


### Your event consumer crashes halfway through processing a message. What happens when it restarts?
- It depends on when the message was acknowledged or the Kafka offset was committed. 
- If the consumer crashes before the acknowledgment or offset commit, the message will be delivered again. 
- Therefore, the consumer should be idempotent so that reprocessing the same event doesn't cause incorrect results.
```js
Receive Event
     ↓
Update Database
     ↓
   CRASH
     ↓
Offset NOT committed

After restart:

Kafka
  ↓
Same Event Again
  ↓   
Consumer

```
- At-least-once delivery + idempotent consumer is a common production approach.

### How would you design retry and dead-letter mechanisms for failed events?
- I would retry transient failures such as network errors or temporary database failures, but I would not retry permanent errors indefinitely.
- I would use exponential backoff with a maximum retry count. 
- After the retry limit is reached, I would send the event to a Dead Letter Queue or Dead Letter Topic for investigation and later reprocessing.
```js
Architecture
Event
  ↓
Consumer
  ↓
Failed
  ↓
Retry #1
  ↓
Failed
  ↓
Retry #2
  ↓
Failed
  ↓
Retry #3
  ↓
DLQ

Exponential backoff

Retry 1 → 1 sec
Retry 2 → 2 sec
Retry 3 → 4 sec
Retry 4 → 8 sec
```
- Usually I would also add jitter so many consumers don't retry simultaneously.

### How would you prevent duplicate event processing?
- I would design consumers to be idempotent because most messaging systems provide at-least-once delivery. 
- Each event would have a unique event ID. Before processing, I would check whether that event has already been processed.-  Alternatively, I could use a database unique constraint or an idempotency table to guarantee that the same event doesn't produce the business effect twice.
```js
Event
{
  "eventId": "evt-123",
  "type": "PaymentCompleted",
  "orderId": "ORD-100"
}

Store
eventId = evt-123
status = PROCESSED

If it comes again:
evt-123 already processed
        ↓
      SKIP

Database approach:
CREATE UNIQUE INDEX
ON processed_events(event_id);
```
### Your event-processing latency has increased from 200ms to 5 seconds. How would you investigate?
- First, I would compare the current metrics with the previous baseline. 
- I would check consumer lag, throughput, CPU and memory, database latency, external API latency and network errors. 
- Then I would use distributed tracing and application logs to identify which part of the processing increased from 200ms to 5 seconds.
- Investigation
```js
200ms → 5 seconds
       ↓
Check metrics
       ↓
Consumer lag?
       ↓
Database slow?
       ↓
External API slow?
       ↓
CPU / Memory?
       ↓
    Network?
       ↓
Lock / contention?
       ↓
Recent deployment?
```

### When would you choose Kafka over SQS?
```js
| Kafka                           | SQS                                     |
| ------------------------------- | --------------------------------------- |
| High-throughput event streaming | Managed message queue                   |
| Event replay                    | Primarily queue-based processing        |
| Long-lived event history        | Messages have queue retention semantics |
| Multiple independent consumers  | Worker-based consumption                |
| Ordering within partitions      | FIFO available with SQS FIFO            |
| Consumer offsets                | AWS-managed queue semantics             |
| Stream processing               | Simple asynchronous processing          |
| Complex event-driven platforms  | Simpler AWS-native workloads            |


```
- Choose Kafka when:
- I need high-throughput event streaming, multiple independent consumers, event replay, partition-based ordering, and consumers that maintain their own offsets.

```js
                    ┌→ Payment Service
                    │
Orders → Kafka ─────┼→ Inventory Service
                    │
                    ├→ Analytics
                    │
                    └→ Recommendation
```
- Each consumer can independently consume the same event stream.
- Choose SQS when:
- I mainly need reliable asynchronous task processing, buffering, retries and simple worker-based consumption without needing a distributed event log.
```js
API
 ↓
SQS
 ↓
Lambda
 ↓
Process Order
```

- Easy memory trick
- SQS = "Please process this job."
- Kafka = "Here is an event stream; multiple systems can consume and replay it."


### How would you design an event-driven architecture for a high-volume e-commerce system?
- High-level architecture
```js
                    ┌───────────────┐
                    │   Clients     │
                    └───────┬───────┘
                            ↓
                       API Gateway
                            ↓
                    ┌───────────────┐
                    │ Order Service │
                    └───────┬───────┘
                            ↓
                         Kafka
                            │
        ┌───────────────────┼────────────────────┐
        ↓                   ↓                    ↓
 Payment Service     Inventory Service     Notification
        ↓                   ↓                    ↓
   Payment DB          Inventory DB          Email/SMS
        │                   │
        └───────────┬───────┘
                    ↓
              Order Status
```

- Step 1 — Accept the order
```js
Client
 ↓
API
 ↓
Order Service
 ↓
Order DB
```
- Store the order first.
- Then publish:
```
OrderCreated
```

- Step 2 — Payment consumes the event
```js
Kafka
 ↓
Payment Service
 ↓
Payment Gateway

```
- Then publish:
```js
PaymentCompleted
Or
PaymentCompleted
```
- Step 3 — Inventory consumes payment/order event
```js
PaymentCompleted
       ↓
Inventory Service
       ↓
Reserve Stock
```
- Then:
```
InventoryReserved
```
- Step 4 — Notification consumes events
```js
OrderConfirmed
      ↓
Notification Service
      ↓
Email / SMS / Push
```


## React


### A React application becomes slow when rendering a large dataset. How would you optimize it?
- First, I would use React DevTools Profiler and browser performance tools to identify whether the problem is rendering, JavaScript processing, or network/API latency. 
- For a large list, I would use virtualization so that only visible rows are rendered instead of thousands of DOM elements. 
- I would also avoid unnecessary re-renders using React.memo, useMemo, and proper component structure. 
- If possible, I would paginate or lazy-load the data from the backend.
```js
Instead of:
10,000 records
      ↓
Render 10,000 DOM elements

Use:
10,000 records
      ↓
Virtualized List
      ↓
Render only ~20 visible rows
```
- Libraries such as react-window or similar virtualization solutions can help.

- React Profiler
- Number of DOM nodes
- Expensive calculations
- Unnecessary re-renders
- API payload size
- Pagination
- Virtualization
- Image sizes

### A component is re-rendering hundreds of times unexpectedly. How would you identify the cause?
- I would start with React DevTools Profiler to see what is causing the component to render. 
- Then I would check whether its state is changing, whether its parent is re-rendering, whether new object or function references are being created on every render, or whether a Context provider is causing unnecessary updates.
- For example:
```js
<Component
  options={{ page: 1 }}
  onClick={() => handleClick()}
/>

Both are new references on every render.
I might change the approach to:

const options = useMemo(() => ({
  page: 1
}), []);

const onClick = useCallback(() => {
  handleClick();
}, []);

Then, where appropriate:
const Component = React.memo(MyComponent);

```
- Debugging flow
```js
Unexpected render
      ↓
React Profiler
      ↓
State changed?
      ↓
Parent changed?
      ↓
Props changed?
      ↓
Object/function reference changed?
      ↓
Context changed?
```



### When would you use useMemo, useCallback, and React.memo?

## useMemo
- Use it to memoize an expensive calculated value.
```js
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);

```
- useMemo → remembers a value

## useCallback
- Use it to memoize a function reference.
```js
const handleDelete = useCallback((id) => {
  deleteUser(id);
}, [deleteUser]);
```
- useCallback → remembers a function

## React.memo
- Use it to prevent a component from re-rendering when its props haven't changed.
```js
const UserRow = React.memo(function UserRow({ user }) {
  return <div>{user.name}</div>;
});
```
- React.memo → remembers component rendering based on props

```js
useMemo is for expensive values, 
useCallback is for stable function references, and React.memo is for avoiding unnecessary component re-renders when props are unchanged. 
I use them based on profiling rather than applying them everywhere because memoization itself has a cost.
```

### How would you manage state in a large React application?
- I would separate state based on its responsibility.
## 1. Local UI state
```js
useState
useReducer

Eg.
Modal open/close
Form field
Dropdown
Selected tab

```

## 2. Global client state
```js
Redux Toolkit

Eg.
User preferences
Shopping cart
Application configuration
Complex workflows

```

## 3. Server state
- Use a server-state library such as:
```js
TanStack Query

Eg.
Users from API
Products
Orders
Dashboard data

```
```js
Architecture

React Application
│
├── Local UI State
│      └── useState / useReducer
│
├── Global Client State
│      └── Redux Toolkit
│
└── Server State
       └── TanStack Query

```
- I don't put everything into Redux. 
- I separate local state, global client state and server state because they have different lifecycles and requirements.


### When would you use Redux Toolkit vs Context API?
- Context API : Good for relatively simple, low-frequency global values.
```js
Theme
Language
Current user
Feature configuration

<ThemeContext.Provider value={theme}>
```
- Redux Toolkit: Better for complex application-wide state.
```js
Eg.
Shopping cart
Complex workflows
Large state tree
Multiple components modifying the same state
Debugging/time-travel requirements
Middleware
Async workflows
```

```js
| Context                    | Redux Toolkit                 |
| -------------------------- | ----------------------------- |
| Simple shared state        | Complex global state          |
| Lightweight                | More structured               |
| Good for configuration     | Good for business state       |
| Less boilerplate           | Strong tooling                |
| Can cause broad re-renders | More controlled subscriptions |

```
- I use Context for relatively static cross-cutting concerns like theme or locale. 
- For complex shared business state with many updates, actions and reducers, I prefer Redux Toolkit because it provides predictable state management and better debugging and scalability.

### Your Redux store has become difficult to maintain. How would you restructure it?
- I would move toward feature-based structure:
```js
src/
├── app/
│   └── store.ts
│
├── features/
│   ├── auth/
│   │   ├── authSlice.ts
│   │   ├── authSelectors.ts
│   │   └── authApi.ts
│   │
│   ├── orders/
│   │   ├── orderSlice.ts
│   │   ├── orderSelectors.ts
│   │   └── orderApi.ts
│   │
│   └── products/
│       ├── productSlice.ts
│       ├── productSelectors.ts
│       └── productApi.ts
```
- Remove duplicated state
- Normalize large collections where useful
- Create selectors
- Keep business logic near its feature
- Separate server state from client state
- Remove unnecessary global state
- Use typed hooks with TypeScript
- I organize Redux by business feature rather than by technical type.

### How would you handle API caching and synchronization in a React application?
- I would generally use a server-state solution such as TanStack Query or RTK Query rather than manually storing every API response in Redux.
```js
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});
```
- It provides concepts such as:
- Caching
- Refetching
- Stale data
- Retries
- Background synchronization
- Query invalidation
- Deduplication

```js
Caching
Refetching
Stale data
Retries
Background synchronization
Query invalidation
Deduplication
```
- I treat API data as server state. 
- I use a dedicated caching solution, configure stale times based on business requirements, invalidate or refetch after mutations, and avoid maintaining multiple inconsistent copies of the same server data.

### A React page has multiple API calls and some depend on the results of others. How would you design the flow?
- First, I identify which calls are independent and which are dependent.
- Independent
```js
       ┌→ User API
Page ──┼→ Product API
       └→ Config API

These can run in parallel.
const [user, products, config] = await Promise.all([
  getUser(),
  getProducts(),
  getConfig()
]);
```
- Dependent
```js
Get User
   ↓
Get User's Account
   ↓
Get Account Transactions

const user = await getUser();
const account = await getAccount(user.accountId);
const transactions =  await getTransactions(account.id);
```
- I parallelize independent API calls and sequence only dependent calls. 
- This reduces total page latency and makes the dependency flow explicit.


### How would you handle authentication state across a React application?
- I would separate:
```js
Authentication
Authorization
Session management

Flow

Login
 ↓
Backend validates credentials
 ↓
Session / tokens established
 ↓
React gets authenticated user
 ↓
Protected routes
 ↓
API requests
```
- For a web application, I generally prefer secure, HTTP-only cookies for session/refresh credentials where the backend architecture supports it, because JavaScript cannot directly read HTTP-only cookies.

```js
React structure

AuthProvider / auth state
        ↓
Current User
        ↓
ProtectedRoute
        ↓
Application

if (!user) {
  return <Navigate to="/login" />;
}
return <Dashboard />;


Important security considerations

- Don't store sensitive credentials unnecessarily in localStorage
- Use HTTPS
- Handle token/session expiration
- Refresh sessions securely
- Enforce authorization on the backend
- Don't rely on React route protection for security

```

### Your React application has a memory leak. How would you troubleshoot it?
- First, I would reproduce the issue and monitor memory using Chrome DevTools.

#### 1. Event listeners
```js
useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

#### 2. Timers
```js
const timer = setInterval(doSomething, 1000);

return () => {
  clearInterval(timer);
};
```

#### 3. Subscriptions
```
WebSocket
EventEmitter
Observable
```
- These should be unsubscribed when the component unmounts.

#### 4. API requests
- Use AbortController where appropriate:

```js
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/users', {
    signal: controller.signal
  });

  return () => controller.abort();
}, []);
```

#### 5. Large objects retained in memory
- I would use:
```js
Chrome DevTools
→ Memory
→ Heap Snapshot
```
- Then compare snapshots before and after repeatedly mounting/unmounting the component.

- Debugging flow
```js
Memory increasing
      ↓
Reproduce
      ↓
Chrome Memory Profiler
      ↓
Heap Snapshot
      ↓
Find retained objects
      ↓
Check effects/listeners/timers/subscriptions
      ↓
Fix cleanup
      ↓
Take snapshot again
```
- I would not assume every memory increase is a React memory leak. 
- I would reproduce it, take heap snapshots, identify objects that remain reachable after components are unmounted, and then inspect effects, timers, event listeners, subscriptions and cached data for missing cleanup.

## System Design

### Design a scalable search API using Node.js, MongoDB/MySQL and Elasticsearch.
- Suppose we have:
```
GET /products/search?q=iphone&category=mobile&page=1
```
- We need:
- Fast search
- Filtering
- Pagination
- Sorting
- Millions of products
- High read traffic
- Architecture
```js
                    ┌──────────────┐
Client ───────────→ │ API Gateway  │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │ Node.js API  │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │ Elasticsearch│
                    └──────────────┘
                           ↑
                           │
              ┌────────────┴────────────┐
              │                         │
          MongoDB                    MySQL
       Source of truth            Source of truth
```
- I would not use MySQL/MongoDB directly for complex text search at scale.
- Elasticsearch becomes the search/read model, while MySQL/MongoDB remains the source of truth.
- Search Flow
```js
Client
 ↓
Node.js
 ↓
Elasticsearch
 ↓
Search results
```
-- Write flow
```js
Create Product
 ↓
MySQL
 ↓
Event
 ↓
Indexer
 ↓
Elasticsearch
```
- Scaling:
- Elasticsearch cluster
- Sharding
- Replicas
- Redis caching for hot searches
- Cursor/search-after pagination
- Rate limiting
- Horizontal Node.js instances
- I would treat Elasticsearch as a search index, not the primary database. The database remains the source of truth.

### Design a URL shortening service that can handle millions of requests.
- Example:
```
https://example.com/products/12345
```
- becomes:
```
https://sho.rt/aB72x
```
- Architecture
```js
Client
  ↓
Load Balancer
  ↓
Node.js API
  ↓
Redis
  ↓
MySQL
```
- Create URL
```js
POST /shorten
       ↓
Generate unique ID
       ↓
Base62 encode
       ↓
Store mapping
       ↓
Return short URL
```
- Example:
```js
123456
   ↓
Base62
   ↓
"abcD9"
```
- Database:
```js
short_code | original_url
-----------|-------------------------
abcD9      | https://example.com/...
```
- Redirect
```js
GET /abcD9
    ↓
Redis
    ↓
Cache HIT → Redirect
    ↓
Cache MISS
    ↓
Database
    ↓
Redis
    ↓
Redirect
```
- Scaling
- Redis caching
- Stateless Node.js servers
- Load balancer
- Database read replicas
- Database sharding if necessary
- Rate limiting
- CDN where appropriate
- The redirect path is read-heavy, so I would optimize it with Redis and keep the Node.js API stateless so I can horizontally scale it.

### Design a notification system supporting email, SMS and push notifications.
- Architecture
```js
Application
    ↓
Notification API
    ↓
Message Queue
    ↓
Notification Workers
    ├── Email Worker
    ├── SMS Worker
    └── Push Worker
```
- For example:
```js
OrderConfirmed
      ↓
SQS / Kafka
      ↓
Notification Service
      ↓
 ┌────┼────┐
 ↓    ↓    ↓
Email SMS Push
```
- Why queue?: Suppose 1 million users need notifications.
- We don't want:
```js
Order API
    ↓
Send Email
    ↓
Send SMS
    ↓
Send Push
```
- because the API becomes slow.
- Each provider can fail.
```js
SMS Provider
     ↓
Failure
     ↓
Retry
     ↓
Exponential Backoff
     ↓
DLQ
```
- This gives us tracking and idempotency.


### Design a real-time chat application using Node.js.
- Architecture
```js
Client
  ↓
Load Balancer
  ↓
Node.js + WebSocket
  ↓
Redis Pub/Sub
  ↓
Other Node.js instances
```
- For larger systems:
```js
Client
 ↓
WebSocket Gateway
 ↓
Kafka / Redis
 ↓
Chat Service
 ↓
Database
```
- Flow:
```js
User A
 ↓
WebSocket Server
 ↓
Chat Service
 ↓
Message Store
 ↓
User B WebSocket
```
- WebSocket handles real-time delivery, Redis/Kafka handles communication between instances, and persistent storage stores message history.

### Design a file upload service supporting large files.
- Don't send a 5 GB file through your Node.js server.
- Instead:
```js
Client
   ↓
Request upload URL
   ↓
Node.js
   ↓
Pre-signed S3 URL
   ↓
Client uploads directly to S3
```
- Architecture
```js
                 ┌─────────────┐
Client ─────────→│ Node.js API │
                 └──────┬──────┘
                        ↓
                 Pre-signed URL
                        ↓
                      S3
                        ↓
                  Upload Event
                        ↓
                     Queue
                        ↓
               Processing Worker
```
- For large files: For large files
```js
5 GB File

Part 1 ──→ S3
Part 2 ──→ S3
Part 3 ──→ S3
...
Part N ──→ S3
```
- That give:
- Parallel uploads
- Resume capability
- Better reliability
- Less memory usage

Parallel uploads: 
- Resume capability
- Better reliability
- Less memory usage
- I would keep large file data out of Node.js and let object storage handle the heavy transfer.


### Design a payment processing system with retry and idempotency.
- Architecture
```js
Client
 ↓
Payment API
 ↓
Node.js
 ↓
Payment Service
 ↓
Payment Provider
```
- But we need to handle failures.
- Idempotency
- Client sends:
```js
   Idempotency-Key: payment-12345
Store:
paymentId
idempotencyKey
status
response

```
- If the same request comes again:
```js
payment-12345
       ↓
Already processed?
       ↓
YES
       ↓
Return previous result
```
- Payment operations must be idempotent because a timeout does not necessarily mean the payment failed.


### Design an order management system for an e-commerce platform.
- Services
```js
              API Gateway
                   ↓
              Order Service
                   ↓
                 Kafka
        ┌──────────┼──────────┐
        ↓          ↓          ↓
     Payment   Inventory   Notification
        ↓          ↓
       DB         DB
```
- Order flow
```js
Create Order
     ↓
OrderCreated
     ↓
Reserve Inventory
     ↓
Payment
     ↓
Order Confirmed
     ↓
Shipment
     ↓
Delivered
```
- Order states
```js
CREATED
   ↓
PAYMENT_PENDING
   ↓
PAID
   ↓
INVENTORY_RESERVED
   ↓
CONFIRMED
   ↓
SHIPPED
   ↓
DELIVERED
```
- Failure:
```js
Payment Failed
     ↓
Cancel Order
     ↓
Release Inventory
```
- Idempotency
- Event-driven communication
- Saga pattern
- Retry
- DLQ
- Transaction boundaries
- Optimistic locking
- Inventory consistency

### Design a system that processes millions of events per day.
- Millions per day isn't necessarily huge for Kafka, but the architecture should handle spikes.
- Architecture
```js
Producers
   ↓
Kafka
   ↓
Partitions
   ↓
Consumer Groups
   ↓
Workers
   ↓
Database / Elasticsearch / S3
```
- Example
```js
             Kafka Topic
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Consumer   Consumer   Consumer
       1          2          3
       └──────────┼──────────┘
                  ↓
              Processing
                  ↓
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      MySQL     Redis    Elasticsearch
```
- Scaling: Increase
```js
Kafka partitions
+
Consumer instances
```
- provided the downstream systems can handle the increased throughput.

- Reliability- Use:
- Replication
- Consumer offsets
- Retry
- DLQ/dead-letter topic
- Idempotent consumers
- Monitoring
- Backpressure


### Design a multi-tenant SaaS application.
- Suppose we have:
```js
Company A
Company B
Company C
```
- All use the same application.
- Architecture
```js
                 Load Balancer
                      ↓
                  Node.js API
                      ↓
                Tenant Resolver
                      ↓
            ┌─────────┴─────────┐
            ↓                   ↓
        Business Logic       Cache
            ↓
         Database
```
- Then every database query must be tenant-aware.
```js
SELECT *
FROM orders
WHERE tenant_id = ?
AND id = ?;
```
- Data isolation options
##### Option 1 — Shared DB/shared tables
- Cheapest and easiest to scale initially.

##### Option 2 — Separate schema per tenant

- Better isolation but more operational complexity.

##### Option 3 — Separate database per tenant

- Highest isolation but expensive and operationally complex.

- Never trust a tenant ID supplied directly by the client. Derive it from authenticated identity/token context.

### Design a backend where one API failure should not affect other services.
- This is about resilience.
- Suppose:
```js
Order API
   ↓
Payment API
   ↓
Notification API
```
- If Notification is down, should Order fail?: No
- Use asynchronous communication
```js
Order Service
     ↓
Kafka / SQS
     ↓
Notification Service
```
- For synchronous dependencies
```js
Timeout
+
Retry
+
Circuit Breaker
+
Fallback
```

### How would you scale a Node.js monolith when traffic grows 10x?
##### Step 1 — Measure the bottleneck:
```js
CPU?
Memory?
Database?
Network?
External APIs?
Node.js event loop?
```
##### Step 2 — Make Node.js stateless
```js
              Load Balancer
              /     |     \
             ↓      ↓      ↓
          Node 1  Node 2  Node 3

Store shared state externally:
- Redis
- Database
- S3
```
##### Step 3 — Horizontal scaling, Run multiple Node.js instances(Cluser can also used)
```js
           Load Balancer
          /      |      \
         ↓       ↓       ↓
      Node.js Node.js Node.js
```
##### Step 4 — Database optimization
- Before scaling application servers, check the database.
- Use:

- Proper indexes
- Query optimization
- Connection pooling
- Read replicas
- Caching
- Partitioning/sharding when justified

##### Step 5 — Add caching
```js
Node.js
   ↓
Redis
   ↓ cache miss
Database
```
##### Step 6 — Move heavy work asynchronously
```js
API
 ↓
SQS/Kafka
 ↓
Worker
```