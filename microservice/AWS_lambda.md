# AWS Lambda Interview Guide

## Senior-Level Questions, Easy Explanations, Code Snippets, and Production Scenarios

> **Study framework:** For each answer, explain what it is, how it
> works, a real production example, and one trade-off. AWS limits and
> retry details can vary by trigger/configuration, so verify the
> settings used in the actual system.

## 1. What is AWS Lambda?

AWS Lambda is a serverless compute service. You provide code and
configure a trigger; AWS manages the underlying execution
infrastructure. Common triggers include API Gateway, SQS, EventBridge,
S3, DynamoDB Streams, Kinesis, and direct SDK invocation.

**Real scenario:** An ecommerce API validates an order in Lambda and
sends background work to SQS.

**Interview answer:** "Lambda is useful for event-driven APIs and
background jobs. I design around duration, concurrency, retries,
idempotency, observability, and downstream capacity."

## 2. Cold starts

### Q1. What is a cold start?

A cold start happens when Lambda must create or initialize an execution
environment before running the handler. Initialization can include
runtime startup, loading code/dependencies, and executing module-level
code. A warm invocation may reuse an environment, but reuse is not
guaranteed.

### Q2. How do you reduce cold starts?

1.  Bundle efficiently with tools such as esbuild; remove unnecessary
    dependencies.
2.  Initialize reusable SDK clients outside the handler.
3.  Avoid expensive module-level work and slow remote calls during
    initialization.
4.  Tune memory; more memory also gives Lambda more CPU.
5.  Use provisioned concurrency for latency-sensitive functions.
6.  Avoid VPC attachment unless private network access is needed.
7.  Consider SnapStart only for supported runtimes/configurations.
8.  Measure real cold/warm latency and initialization duration.

``` ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event: { userId: string }) => {
  const result = await ddb.send(new GetCommand({
    TableName: process.env.USERS_TABLE!,
    Key: { userId: event.userId }
  }));

  return result.Item ?? null;
};
```

The client can be reused in a warm environment. Keep request-specific
data local and handle transient connection errors.

**Interview answer:** "I reduce cold starts by trimming dependencies,
moving reusable initialization outside the handler, tuning memory/CPU,
and using provisioned concurrency when latency objectives justify its
cost. SnapStart is only an option for supported configurations. I
measure before and after."

## 3. Memory, CPU, and cost

### Q3. How does memory affect Lambda CPU and cost?

CPU allocation scales with memory. More memory can shorten CPU-bound
work. The configured memory costs more per unit time, but shorter
duration may offset that increase. Lowest memory is not always cheapest.

### Q4. How do you tune memory?

Use AWS Lambda Power Tuning to compare memory settings against duration
and estimated cost. Test representative events and data; compare p50/p95
latency, errors, and cost; repeat after significant changes.

**Scenario:** A JSON-processing function runs faster with more CPU,
potentially reducing both latency and total cost.

## 4. Concurrency and throttling

### Q5. What is concurrency?

Concurrency is the number of invocations running simultaneously.

\[ `\text{Concurrency}`{=tex}
`\approx `{=tex}`\text{requests per second}`{=tex}
`\times `{=tex}`\text{average duration in seconds}`{=tex} \]

For example, 100 requests/second with a 2-second average duration
implies roughly 200 concurrent executions under steady load.

### Q6. Account limit vs reserved vs provisioned concurrency

-   **Account concurrency quota:** regional capacity available across
    functions, subject to current quotas and allocation rules.
-   **Reserved concurrency:** reserves capacity for a function and sets
    its maximum concurrency; it also reduces capacity available to other
    functions.
-   **Provisioned concurrency:** keeps a configured number of execution
    environments initialized for a version or alias to reduce cold-start
    latency; it has additional cost.
-   **Throttling:** happens when capacity or another applicable limit is
    exceeded.

### Q7. How do you protect RDS from Lambda bursts?

-   Set a measured reserved-concurrency cap.
-   Consider RDS Proxy for supported database configurations.
-   Reuse connections carefully and keep transactions short.
-   Put background tasks behind SQS to smooth bursts.
-   Monitor RDS connections, database latency, Lambda throttles, queue
    age, and function duration.

Illustrative AWS SAM configuration:

``` yaml
Resources:
  OrderWorker:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/worker.handler
      Runtime: nodejs22.x
      ReservedConcurrentExecutions: 20
```

Twenty is only an example; determine the safe limit from the database
connection budget and other clients.

**Interview answer:** "I cap database-heavy concurrency, use RDS Proxy
when appropriate, buffer bursts with SQS, and tune limits against
measured RDS capacity."

## 5. Timeouts and long-running jobs

### Q8. What is Lambda's maximum timeout?

A Lambda invocation can run for up to **15 minutes**. API Gateway has a
separate integration timeout; around 29 seconds is common for many REST
API configurations, but the limit varies by API type, configuration, and
quota. Verify the actual integration.

### Q9. What if a job takes longer than an HTTP request can wait?

Do not keep the client waiting. Return a job ID and process
asynchronously using SQS, Step Functions, asynchronous invocation, or a
container service such as ECS/Fargate or AWS Batch when appropriate.

``` json
{
  "jobId": "job-123",
  "status": "accepted",
  "statusUrl": "/jobs/job-123"
}
```

**Scenario:** `POST /reports` stores a job record, sends a message to
SQS, and returns `202 Accepted`. The worker updates status. The client
polls `GET /reports/{jobId}` or receives a callback. Store large report
output in S3 rather than in the status record.

## 6. Synchronous vs asynchronous vs stream-based invocation

### Q10. Explain invocation models and retries

**Synchronous** (API Gateway or SDK `RequestResponse`): - Caller waits
for the result. - Function errors are returned to the caller. - Lambda
does not automatically retry a synchronous function error like standard
asynchronous invocation; the caller may retry.

**Asynchronous** (SDK `Event`, and many event-source integrations): -
Lambda accepts/queues the event and returns quickly. - For standard
asynchronous invocation, function-code errors are retried **two
additional times by default**. - Throttling/system errors have different
retry behavior and may be retried for longer. - Configure event age,
retry policy, DLQ or on-failure destination.

**SQS event source mapping:** - Lambda polls SQS and invokes with
batches. - Failures can lead to retries; visibility timeout, redrive
policy, and DLQ matter. - Partial batch responses can acknowledge
successful records independently when configured. - Delivery can be
duplicated, so processing must be idempotent.

**Kinesis / DynamoDB Streams:** - Lambda processes records in batches. -
Errors can block progress on a shard or affected sequence depending on
configuration. - Consider retry limits, maximum record age,
bisect-on-error, partial batch responses, and failure destinations. - A
poison record can delay later records; preserve ordering requirements
when deciding whether to skip it.

  -----------------------------------------------------------------------
  Model                   Caller waits?           Main failure concern
  ----------------------- ----------------------- -----------------------
  Synchronous             Yes                     Caller sees
                                                  result/error and may
                                                  retry

  Asynchronous            No                      Default function-error
                                                  retries are two
                                                  additional attempts;
                                                  configure failure
                                                  destination

  SQS                     No, producer is         Visibility timeout,
                          decoupled               redrive/DLQ, duplicates

  Kinesis/DynamoDB        No, event source polls  Batch retries can delay
  Streams                                         shard progress
  -----------------------------------------------------------------------

**Interview warning:** Do not say "Lambda always retries twice." Retry
behavior depends on invocation model and event source.

## 7. Idempotency

### Q11. What is idempotency and why is it important?

An operation is idempotent when processing the same logical request more
than once has the same intended effect as processing it once.
At-least-once delivery means duplicates can happen. Without idempotency,
a customer might be charged twice or duplicate orders may be created.

### Q12. How do you implement it?

-   Use a stable request/event idempotency key.
-   Store the key and processing status durably.
-   Use conditional writes to claim the key atomically.
-   Store completed results so duplicate calls can replay them.
-   Define behavior for in-progress work, crashes, expiration, and
    cleanup.
-   Consider AWS Lambda Powertools idempotency utilities for TypeScript.
-   For payments, use the payment provider's idempotency mechanism too.

Illustrative DynamoDB conditional claim:

``` ts
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";

declare const ddb: DynamoDBDocumentClient;

async function claimKey(key: string) {
  try {
    await ddb.send(new PutCommand({
      TableName: process.env.IDEMPOTENCY_TABLE!,
      Item: {
        id: key,
        status: "IN_PROGRESS",
        requestToken: randomUUID(),
        createdAt: new Date().toISOString()
      },
      ConditionExpression: "attribute_not_exists(id)"
    }));

    return { claimed: true as const };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ConditionalCheckFailedException"
    ) {
      return { claimed: false as const };
    }
    throw error;
  }
}
```

This is only an atomic claim, not a complete idempotency implementation.
Production logic must handle existing in-progress keys, cached completed
results, lease/expiry, and crashes between an external side effect and
saving completion. Do not assume an existing key means the operation
completed successfully.

**Flow:** derive key → atomically claim → return stored result if
complete → handle in-progress state → perform operation → persist result
→ make external side effects idempotent too.

**Interview answer:** "Retries and at-least-once delivery make
duplicates normal. I use a stable key, a durable conditional write, and
stored status/result. I plan for crashes around side effects and use
provider-level idempotency for payments."

## 8. Lambda layers

### Q13. What is a Lambda layer?

A layer packages libraries, instrumentation, or other files shared with
functions at runtime.

**Use when:** several functions genuinely share a dependency or
monitoring agent.

**Trade-offs:** layer versions and compatibility add complexity;
debugging and local tests can be harder; layers do not automatically
make code faster or smaller at runtime. For one small function, bundling
dependencies may be simpler.

## 9. Lambda in a VPC

### Q14. When should Lambda be in a VPC?

When it needs private network access to RDS, RDS Proxy,
ElastiCache/Redis, or internal private services. Do not attach it merely
because it calls a public AWS API.

### Q15. NAT Gateway vs VPC endpoints

-   **NAT Gateway:** lets private-subnet resources initiate connections
    to public IPv4 destinations; it has hourly and data-processing
    charges.
-   **VPC endpoints:** provide private access to supported AWS services.
    -   **Gateway endpoints:** commonly S3 and DynamoDB.
    -   **Interface endpoints / PrivateLink:** many other AWS services.

``` text
API Gateway
    |
    v
Lambda (private subnets)
    |
    +----> RDS Proxy ----> RDS
    |
    +----> S3 Gateway Endpoint ----> S3
    |
    +----> NAT Gateway ----> Public APIs (only if required)
```

Endpoints are service-specific; they do not provide general internet
access. Review IAM, endpoint policies, routing, DNS, and security
groups.

**Interview answer:** "I attach Lambda to a VPC for private resource
access. I consider endpoints for private AWS-service traffic and use NAT
only when general outbound internet access is needed, accounting for its
cost."

## 10. Other important Lambda questions

### Q16. What can safely be initialized outside the handler?

Reusable SDK clients, immutable configuration, and carefully managed
connection pools. Request-specific data should stay local; global
in-memory state is not durable and is not shared between execution
environments.

``` ts
const client = createClient();

export const handler = async (event: { requestId: string }) => {
  const requestId = event.requestId;
  return { requestId };
};
```

### Q17. How do you handle secrets?

Use least-privilege IAM roles. Keep ordinary configuration in
environment variables, but use Secrets Manager or Parameter Store for
sensitive values when appropriate. Avoid logging secrets and rotate
credentials.

### Q18. How do you monitor Lambda in production?

-   CloudWatch Logs with structured logs and correlation IDs.
-   Metrics: invocations, duration, errors, throttles, concurrency,
    queue age, and stream iterator age.
-   X-Ray or supported tracing for dependency latency.
-   Alarms for error rate, p95/p99 duration, throttling, DLQ depth,
    queue age, and downstream saturation.
-   Redact PII, tokens, and payment data.

### Q19. How do you deploy safely?

Use infrastructure as code (SAM, CDK, Terraform, CloudFormation),
automated tests, versions and aliases where appropriate, staged/canary
traffic shifting, alarms, and rollback. Make schema/database changes
compatible with old and new code during rollout.

### Q20. When should you not use Lambda?

Consider ECS/Fargate or AWS Batch for work exceeding the execution-time
limit, sustained specialized compute, continuously running processes, or
workloads needing host-level control. Lambda can still trigger or
orchestrate those jobs.

## 11. Real-world scenario questions

### Scenario A: Traffic spikes and RDS is overloaded

**Answer:** Check Lambda concurrency, throttles, function duration, RDS
connections, CPU, and query latency. Cap concurrency, consider RDS
Proxy, buffer non-urgent work with SQS, improve queries/indexes, use
bounded retries with backoff and jitter, and load-test the safe limit.

### Scenario B: Customer is charged twice

**Answer:** Add a stable idempotency key, conditional durable state, and
provider-level payment idempotency. Define recovery for a crash after
the provider succeeds but before local completion is saved. Reconcile
uncertain outcomes rather than blindly charging again.

### Scenario C: API work takes 90 seconds and API Gateway times out

**Answer:** Return `202 Accepted` and a job ID. Queue the work or start
Step Functions, persist status, and support polling or a callback.
Verify actual integration limits before changing timeouts.

### Scenario D: Only the first request is slow

**Answer:** Compare cold and warm latency and initialization duration.
Trim bundles, move reusable client setup outside the handler, avoid slow
top-level work, tune memory, and test provisioned concurrency or
SnapStart if supported.

### Scenario E: One stream record repeatedly fails

**Answer:** Find the poison record, inspect logs and failure
destinations, tune retry limits and maximum record age, and consider
bisect-on-error or partial batch reporting where supported. Preserve
ordering requirements and alert on iterator age.

### Scenario F: Large file processing runs out of memory

**Answer:** Stream in chunks with backpressure instead of accumulating
the entire file. Write output incrementally and check timeout
constraints. Split the work or use ECS/Fargate or Batch if needed.

## 12. Rapid revision table

  -----------------------------------------------------------------------
  Topic                               One-line answer
  ----------------------------------- -----------------------------------
  Cold start                          Initialization before a new
                                      environment runs the handler.

  Reduce cold starts                  Smaller bundle, efficient
                                      initialization, memory tuning,
                                      provisioned concurrency, SnapStart
                                      where supported.

  Memory and CPU                      More memory provides more CPU;
                                      benchmark latency and cost.

  Concurrency                         Number of simultaneous invocations.

  Reserved concurrency                Reserves capacity for a function
                                      and sets its cap.

  Provisioned concurrency             Keeps initialized environments
                                      ready; additional cost.

  Protect RDS                         Cap concurrency, consider RDS
                                      Proxy, queue bursts, tune queries.

  Maximum Lambda duration             Up to 15 minutes per invocation.

  Long jobs                           SQS, Step Functions, async job +
                                      polling, ECS/Fargate, Batch.

  Async invocation retries            Standard function errors get two
                                      additional retries by default;
                                      policies can vary.

  SQS                                 At-least-once delivery; retries and
                                      DLQ depend on visibility/redrive
                                      settings.

  Streams                             Batch errors can delay shard
                                      progress; configure failure
                                      handling.

  Idempotency                         Repeated processing has the same
                                      intended effect as one processing.

  Layers                              Share dependencies, with
                                      versioning/debugging trade-offs.

  VPC                                 Private resource access; consider
                                      endpoints and NAT cost.

  Monitoring                          Logs, metrics, tracing, alarms,
                                      queue age, downstream health.
  -----------------------------------------------------------------------

## 13. Self-test checklist

-   [ ] Explain cold start and six ways to reduce it.
-   [ ] Explain why more memory can reduce latency and sometimes total
    cost.
-   [ ] Describe Lambda Power Tuning.
-   [ ] Estimate concurrency from request rate and duration.
-   [ ] Reserved vs provisioned concurrency?
-   [ ] How would you protect RDS from a concurrency spike?
-   [ ] What is Lambda's maximum execution time?
-   [ ] Design a 90-second report API.
-   [ ] Compare sync, async, SQS, and stream failure behavior.
-   [ ] Explain idempotency and DynamoDB conditional writes.
-   [ ] Recover if payment succeeds but Lambda crashes before saving
    completion.
-   [ ] When are layers useful?
-   [ ] Why use a VPC? NAT Gateway vs VPC endpoint?
-   [ ] How do you monitor and safely deploy Lambda?

## Final memory framework

For every Lambda interview question:

**Definition → AWS behavior → production risk → mitigation → metric to
monitor.**

For event-driven systems remember:

**Retries happen → duplicates are possible → make processing idempotent
→ monitor failures and backlog.**
