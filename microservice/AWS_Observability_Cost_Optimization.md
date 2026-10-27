# AWS Observability, Troubleshooting, and Cost Optimization Interview Guide

## CloudWatch, X-Ray, Lambda Powertools, Logs Insights, Latency Debugging, and Cost

Senior-level interview preparation for Node.js, TypeScript, and AWS with
practical examples and real-world troubleshooting steps.

------------------------------------------------------------------------

## 1. Observability: logs, metrics, and traces

**Easy answer:** Observability helps you understand a system's internal
behavior from its outputs.

-   **Logs:** what happened, with useful context.
-   **Metrics:** how often/how much/how long, summarized over time.
-   **Traces:** where one request spent time across service boundaries.

They complement each other. A metric can tell you latency increased; a
trace can identify a slow dependency; logs can explain the failure for a
specific request.

### Structured logging

Prefer JSON logs with consistent fields instead of free-form text.

Useful fields: - `timestamp`, `level`, `message` - `service`,
`environment`, `version` - `requestId`, `correlationId`, `traceId` -
`operation`, `durationMs`, `statusCode` - Safe error name/code and
relevant non-sensitive context

Do **not** log passwords, secret values, full JWTs, session credentials,
or unnecessary personal data.

Example:

``` ts
console.log(JSON.stringify({
  level: "INFO",
  message: "Order processed",
  service: "orders-api",
  environment: process.env.ENVIRONMENT,
  correlationId,
  orderId,
  durationMs,
  status: "success"
}));
```

In production, use a logger that supports structured fields, log levels,
redaction, and consistent context.

### Correlation IDs

A correlation ID connects logs and events belonging to one business
operation across multiple services.

-   Accept a trusted incoming request ID if your architecture defines
    how it is validated; otherwise generate one.
-   Return or propagate the ID through response headers and downstream
    calls/events.
-   Include it in logs and relevant message attributes.
-   Keep it distinct from a trace ID: a correlation ID is
    application/business context, while a trace ID belongs to a
    distributed trace.
-   Do not use a client-supplied ID as an authorization decision.

------------------------------------------------------------------------

## 2. AWS X-Ray distributed tracing

X-Ray traces requests across instrumented services. A trace consists of
segments and subsegments, which can reveal where latency is spent.

Example path:

``` text
Client → API Gateway → Lambda → DynamoDB
                         └────→ External payment API
```

A trace may show: - API Gateway overhead - Lambda
initialization/invocation time - DynamoDB request latency - External
HTTP dependency latency - Errors, retries, and service-call patterns

### How to use it

1.  Enable tracing where supported on API Gateway and Lambda.
2.  Instrument supported AWS SDK and HTTP calls where needed.
3.  Inspect service map and representative slow/error traces.
4.  Compare fast and slow traces.
5.  Correlate trace IDs with structured logs.
6.  Avoid collecting sensitive payloads or excessive high-cardinality
    annotations.

X-Ray sampling means not every request is necessarily traced. Ensure
sampling settings are appropriate for debugging and cost, and use
metrics/logs alongside traces.

------------------------------------------------------------------------

## 3. AWS Lambda Powertools for TypeScript

AWS Lambda Powertools provides utilities for structured logging,
tracing, metrics, and other operational practices.

Install the packages you need:

``` bash
npm install @aws-lambda-powertools/logger \
  @aws-lambda-powertools/tracer \
  @aws-lambda-powertools/metrics
```

### Example: Logger, Tracer, and Metrics

``` ts
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Metrics, MetricUnit } from "@aws-lambda-powertools/metrics";

const logger = new Logger({ serviceName: "orders-api" });
const tracer = new Tracer({ serviceName: "orders-api" });
const metrics = new Metrics({
  namespace: "OrdersService",
  serviceName: "orders-api"
});

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  logger.addContext(context);
  logger.appendKeys({
    requestId: context.awsRequestId,
    routeKey: event.routeKey
  });

  const start = Date.now();

  try {
    logger.info("Handling request");

    // Business logic goes here.
    const result = { ok: true };

    metrics.addMetric("RequestSuccess", MetricUnit.Count, 1);
    metrics.addMetric("RequestDurationMs", MetricUnit.Milliseconds, Date.now() - start);

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(result)
    };
  } catch (error) {
    logger.error("Request failed", { error });
    metrics.addMetric("RequestFailure", MetricUnit.Count, 1);
    throw error;
  } finally {
    metrics.publishStoredMetrics();
  }
};
```

### Tracing example

Use the tracer's supported capture APIs for AWS SDK clients and
important functions, following the installed Powertools version's
documentation. Enable active tracing on the Lambda function and ensure
required permissions/configuration are in place. Avoid assuming that
merely constructing a `Tracer` automatically instruments every
dependency.

### Powertools reminders

-   **Logger:** structured logs, context, consistent fields.
-   **Tracer:** tracing integrations and annotations/metadata.
-   **Metrics:** CloudWatch Embedded Metric Format (EMF) metrics.
-   Keep metric dimensions low-cardinality (e.g. service, environment),
    not per-user or per-order IDs.
-   Do not publish sensitive information as annotations or metric
    dimensions.

------------------------------------------------------------------------

## 4. CloudWatch metrics and alarms

Metrics help detect symptoms and trigger alerts. Choose alarms based on
user impact, not just resource activity.

### Useful Lambda metrics

-   `Errors`
-   `Duration` (consider p95/p99 where available in dashboards/metric
    analysis)
-   `Throttles`
-   `ConcurrentExecutions`
-   `IteratorAge` for relevant stream-based event sources
-   `DeadLetterErrors` or destination-related metrics where applicable
-   Custom business metrics such as failed payments or orders stuck in
    processing

### API Gateway metrics

-   `Latency`: overall API Gateway request latency as measured by the
    service.
-   `IntegrationLatency`: time spent waiting for the backend
    integration.
-   `5XXError` / `4XXError`, request count, and throttling metrics.

Exact metric names and availability differ by API type and
configuration; check the relevant API Gateway metrics documentation for
the deployed API.

### Alarm design

-   Alarm on user-visible symptoms: elevated p95 latency, 5xx rate,
    throttles, or business failures.
-   Use a meaningful evaluation period and threshold.
-   Use separate warning and critical thresholds where useful.
-   Route alarms to an operational notification path.
-   Avoid noisy alarms on low-volume percentage metrics without minimum
    request volume.
-   Test alarms and rollback actions, not just their existence.

------------------------------------------------------------------------

## 5. CloudWatch Logs Insights queries

Logs Insights helps search and aggregate structured logs.

### Query 1: Most common errors

``` sql
fields @timestamp, level, message, requestId, correlationId
| filter level = "ERROR" or level = "error"
| stats count(*) as errorCount by message
| sort errorCount desc
| limit 20
```

### Query 2: Slow requests

``` sql
fields @timestamp, durationMs, routeKey, requestId
| filter ispresent(durationMs)
| stats avg(durationMs) as avgMs,
        pct(durationMs, 95) as p95Ms,
        max(durationMs) as maxMs
  by routeKey
| sort p95Ms desc
```

### Query 3: Inspect one correlation ID

``` sql
fields @timestamp, level, message, correlationId, traceId
| filter correlationId = "replace-with-correlation-id"
| sort @timestamp asc
```

### Query 4: Find Lambda timeout/error clues

``` sql
fields @timestamp, @message, @logStream
| filter @message like /Task timed out|ERROR|Exception/
| sort @timestamp desc
| limit 100
```

Adjust field names to match the actual log schema. Queries are most
effective when logs are consistently structured.

------------------------------------------------------------------------

## 6. Scenario: "Users report the API is slow. How do you debug it?"

A strong senior-level answer is systematic: measure first, compare
layers, identify the bottleneck, change one thing, and verify.

### Step 1: Confirm scope and impact

-   Is every endpoint slow or only one route?
-   Did it start after a deployment, traffic increase, or dependency
    change?
-   Is it global or limited to a region/client/tenant?
-   Check p50, p95, p99 latency, request volume, 4xx/5xx, and time
    window.

### Step 2: Separate API Gateway latency from integration latency

Compare API Gateway `Latency` with `IntegrationLatency`.

-   If total latency rises but integration latency remains stable,
    investigate gateway/client/network behavior, authorization,
    request/response processing, and measurement boundaries.
-   If integration latency rises, investigate Lambda/backend execution
    and downstream dependencies.

These metrics are clues, not a complete decomposition of every
millisecond.

### Step 3: Use X-Ray traces

Compare slow traces against normal traces. Find the slow segment: -
Lambda initialization or execution? - DynamoDB/RDS call? - External
API? - Retries or multiple sequential calls? - Serialization or
unusually large payload?

### Step 4: Check Lambda cold starts and runtime behavior

Inspect initialization duration, concurrency, throttles, deployment
changes, and whether traffic patterns cause frequent cold starts. Cold
starts are one hypothesis, not the default explanation for all latency.

### Step 5: Check the database and downstream dependencies

-   Database CPU, connections, locks, slow queries, and connection pool
    behavior.
-   Missing/inefficient indexes and N+1 queries.
-   External service latency, retries, DNS/TLS setup, and timeouts.
-   Queue depth/age if the API depends on asynchronous processing.

### Step 6: Check Lambda memory and CPU

Lambda memory allocation also affects available CPU. If execution is
CPU-bound, increasing memory may reduce duration enough to offset some
added per-millisecond cost. Benchmark rather than guessing.

### Step 7: Check networking

For VPC-attached functions, examine NAT gateway, DNS, routing, security
groups, and endpoint configuration. A NAT path can add cost and can
become a bottleneck for outbound dependencies, but do not remove it
without confirming the required network path.

### Step 8: Mitigate and verify

-   Roll back a recent release if evidence points to it.
-   Tune query/indexes, connection reuse, memory, concurrency, or
    caching.
-   Use async queues for work that need not block the request.
-   Set timeouts and bounded retries.
-   Re-test with representative traffic.
-   Confirm p95/p99 and error rate improve; add an alarm or regression
    test.

### Interview-ready 60-second answer

"I first establish the scope and compare p50/p95/p99 latency, errors,
traffic, and deployment history. I compare API Gateway `Latency` with
`IntegrationLatency` to see whether the delay is before or inside the
backend integration. Then I inspect X-Ray traces and structured logs
using request/correlation IDs. If Lambda is slow, I check init duration,
memory/CPU, concurrency, and throttling. If time is in a dependency, I
inspect DB query plans, connection pools, external API latency, retries,
and networking. I mitigate the demonstrated bottleneck, then verify the
improvement with the same metrics and add an alert or regression test."

------------------------------------------------------------------------

## 7. Cost optimization for serverless workloads

**Principle:** Optimize cost without weakening reliability, security, or
user experience. Measure the workload first, then benchmark changes.

### Lambda memory right-sizing

Lambda memory affects both memory and CPU allocation. More memory can
make CPU-bound code finish faster.

How to optimize: 1. Measure duration and memory utilization. 2.
Benchmark representative traffic with multiple memory settings. 3.
Compare total cost per successful request, not just the per-invocation
price. 4. Check p95 latency and errors after changing memory. 5.
Consider Lambda Power Tuning for systematic experiments.

Too little memory can increase duration or cause out-of-memory failures;
too much can waste cost if execution time does not improve.

### ARM / Graviton

AWS Graviton-based Lambda architectures can offer a favorable
price/performance profile for compatible workloads. Verify: - Native
dependencies and binaries support ARM64. - Layers and extensions are
built for the architecture. - Integration tests pass. - Benchmark actual
duration, error rate, and cost before switching.

### API Gateway HTTP API vs REST API

HTTP APIs generally have lower cost and simpler feature sets than REST
APIs. Choose HTTP API when its feature set satisfies requirements.
Choose REST API when you need capabilities that are specific to REST
APIs in your architecture. Verify current feature availability and
regional pricing before deciding.

### CloudWatch log retention

-   Set explicit retention periods based on compliance and
    troubleshooting needs.
-   Avoid retaining high-volume debug logs indefinitely.
-   Use log levels and sampling thoughtfully.
-   Redact sensitive data before it reaches CloudWatch.
-   Export/archive logs only when long-term retention is required,
    accounting for storage and query costs.

Do not shorten retention below audit, regulatory, or incident-response
requirements.

### NAT Gateway costs and alternatives

NAT Gateways charge for usage and processed data. Review whether private
subnets need outbound internet access for the workload.

Possible optimizations: - Use VPC endpoints for supported AWS services
(for example, S3 or DynamoDB gateway endpoints where applicable). - Use
interface endpoints for supported services when their cost is
justified. - Remove unnecessary internet-bound dependencies. - Consider
whether Lambda truly needs VPC attachment. - Keep required outbound
controls; do not remove NAT just to reduce cost if the function needs
it.

VPC endpoints have their own pricing and architecture trade-offs.
Compare the whole data path, availability, security, and data-transfer
costs.

### DynamoDB on-demand vs provisioned

  -------------------------------------------------------------------------
  Mode                    Good fit                Main trade-off
  ----------------------- ----------------------- -------------------------
  On-demand               Variable or             Per-request cost can be
                          unpredictable traffic;  higher for steady,
                          low operational         predictable high volume
                          overhead                

  Provisioned             Predictable workloads   Requires capacity
                          where capacity can be   planning;
                          forecast                under/over-provisioning
                                                  can waste cost or
                                                  throttle traffic

  Provisioned + auto      Workloads with          Scaling is not
  scaling                 predictable baselines   instantaneous for every
                          and changing demand     burst; configure headroom
                                                  and monitor throttling
  -------------------------------------------------------------------------

Use CloudWatch consumed capacity, throttles, request patterns, and cost
data. Account for read/write patterns, indexes, item sizes, backups,
streams, and data transfer---not just base table request charges.

### Other practical optimizations

-   Cache repeated reads when data freshness allows.
-   Batch work where it reduces overhead without harming latency.
-   Avoid excessive Lambda invocations caused by polling or chatty
    workflows.
-   Tune SQS batch sizes and concurrency safely.
-   Use asynchronous processing for work that does not need to block the
    API.
-   Set budgets, cost anomaly detection, and cost allocation tags.
-   Monitor cost per business operation (for example, cost per order),
    not only monthly total.

------------------------------------------------------------------------

## 8. Cost/performance trade-offs: common interview answers

### "Should I increase Lambda memory?"

Only after measuring. If CPU-bound, more memory may shorten duration
enough to improve latency and sometimes total cost. Benchmark cost per
successful request.

### "Should I use ARM?"

Consider it for compatible workloads, then test native dependencies and
benchmark performance and cost.

### "Should I use HTTP API instead of REST API?"

Use HTTP API if its features meet requirements and cost/latency are
favorable. Do not choose based on price alone if required REST API
capabilities are missing.

### "Can I eliminate NAT Gateway?"

Only if the network design still supports required outbound traffic.
Check VPC endpoints, AWS service calls, and third-party APIs before
changing it.

### "On-demand or provisioned DynamoDB?"

On-demand for unpredictable traffic and operational simplicity;
provisioned/auto scaling for predictable patterns where measured cost is
lower and capacity can be managed safely.

------------------------------------------------------------------------

## 9. Production scenario questions

### A. API p95 latency doubled after a release

Compare deployment timestamps, route-level latency, error rate, and
X-Ray traces. If the new version is implicated, roll back safely and
inspect code/query/dependency changes.

### B. Average latency is fine but some users experience timeouts

Inspect p95/p99, per-route/per-region slices, throttles, downstream
outliers, retries, and connection pools. Averages can hide tail latency.

### C. Lambda cost rose sharply

Break down invocations, duration, memory, concurrency, retries, and log
volume. Identify whether traffic, slower execution, retry storms, or
configuration changed. Benchmark memory and reduce unnecessary work.

### D. CloudWatch bill is unexpectedly high

Inspect log ingestion volume, retention, verbose logging, metric
cardinality, and trace sampling. Keep required audit data and avoid
deleting logs needed for compliance.

### E. VPC Lambda has slow outbound calls and high cost

Check whether traffic traverses NAT, whether calls target AWS services
with available VPC endpoints, and whether VPC attachment is required.
Measure before changing routes.

### F. DynamoDB throttles during traffic spikes

Inspect consumed capacity, hot partition/access patterns, key
distribution, and request shape. Consider on-demand capacity, auto
scaling/headroom, or redesigning hot keys; do not assume simply raising
capacity fixes a hot partition pattern.

### G. Traces are missing for some requests

Review sampling configuration, tracing settings on each service,
permissions/configuration, and instrumentation. Use logs/metrics as
complementary signals because sampling means traces may not exist for
every request.

------------------------------------------------------------------------

## 10. Quick interview questions

**Q1. Logs vs metrics vs traces?**\
Logs describe events, metrics summarize behavior over time, and traces
show a request's path across services.

**Q2. What is a correlation ID?**\
An identifier propagated across service calls/events to connect related
logs; it is distinct from a distributed trace ID.

**Q3. Why use X-Ray?**\
To locate latency and errors across instrumented service boundaries and
dependencies.

**Q4. What does Powertools Logger do?**\
Provides structured logging and consistent contextual fields.

**Q5. What does Powertools Tracer do?**\
Supports tracing integrations and annotations/metadata when configured
and used with supported APIs.

**Q6. What does Powertools Metrics do?**\
Emits CloudWatch metrics using Embedded Metric Format.

**Q7. API Gateway latency vs integration latency?**\
Latency is overall service-measured request time; integration latency
measures time waiting for the backend integration. Compare them to
narrow the investigation.

**Q8. How do you investigate a slow API?**\
Scope impact → compare metrics → inspect traces/logs → test Lambda and
dependency hypotheses → mitigate → verify.

**Q9. Why increase Lambda memory?**\
It also increases CPU allocation, which can reduce duration for
CPU-bound workloads.

**Q10. Why consider ARM?**\
Compatible Graviton-based Lambda workloads may improve
price/performance; benchmark and validate native dependencies.

**Q11. Why use HTTP API?**\
Potentially lower cost and simpler operation when its feature set meets
the requirements.

**Q12. How do you reduce CloudWatch costs safely?**\
Set appropriate retention, reduce unnecessary log volume, use suitable
metric dimensions and trace sampling, while preserving required audit
data.

**Q13. When use DynamoDB on-demand?**\
When traffic is unpredictable or operational simplicity is valuable;
compare cost against provisioned capacity for steady workloads.

**Q14. How can NAT cost be reduced?**\
Use appropriate VPC endpoints for supported AWS traffic, remove
unnecessary outbound dependencies, and verify whether VPC attachment is
needed.

------------------------------------------------------------------------

## 11. Final 30-second revision

-   **Logs:** structured JSON, consistent fields, redaction.
-   **Correlation ID:** joins related logs/events across services.
-   **Trace ID/X-Ray:** shows where request time is spent.
-   **Powertools:** Logger, Tracer, Metrics.
-   **CloudWatch:** alarms, metrics, dashboards, Logs Insights.
-   **Slow API:** scope → Gateway latency vs integration latency → X-Ray
    → Lambda init/memory/concurrency → DB/external dependency/network →
    mitigate → verify.
-   **Lambda memory:** benchmark latency and cost per successful
    request.
-   **ARM/Graviton:** validate compatibility and benchmark.
-   **HTTP API:** cheaper/simpler when required features are supported.
-   **Log retention:** explicit, compliant, and cost-aware.
-   **NAT:** inspect traffic and VPC endpoints before changing network
    design.
-   **DynamoDB:** on-demand for variable traffic; provisioned/auto
    scaling for predictable workloads.
-   **Cost discipline:** monitor cost per business operation and protect
    reliability/security.

### Strong senior-level closing answer

"I use metrics to detect the symptom, traces to locate the slow
dependency, and structured logs with correlation IDs to explain the
specific request. I make one evidence-based change at a time and verify
p95/p99 latency and error rates. For cost, I benchmark memory and
architecture choices, review API Gateway and networking needs, set log
retention, and select DynamoDB capacity mode from real traffic patterns
rather than assumptions."
