# AWS Infrastructure as Code and CI/CD Interview Guide

## 1. Infrastructure as Code (IaC)

**Easy answer:** IaC means defining infrastructure in version-controlled
code/templates so it can be reviewed, tested, reproduced, and deployed
consistently.

It can manage Lambda, API Gateway, SQS/SNS/EventBridge, DynamoDB, S3,
KMS, IAM roles, alarms, and deployment configuration.

**Benefits:** repeatability across environments, reviewable change
history, reduced manual drift, disaster recovery, and automated testing.

**Interview line:** "I keep infrastructure definitions in version
control, review proposed changes, and make environment differences
explicit rather than manually changing resources in the console."

------------------------------------------------------------------------

## 2. SAM vs Serverless Framework vs CDK

  --------------------------------------------------------------------------
  Tool              What it is        Strengths            Trade-offs / best
                                                           fit
  ----------------- ----------------- -------------------- -----------------
  AWS SAM           AWS-focused       Concise serverless   AWS-specific;
                    serverless        syntax, local        great for
                    framework built   build/test tooling,  straightforward
                    around            AWS integration      Lambda/API
                    CloudFormation                         Gateway/SQS
                                                           services

  Serverless        Serverless        Developer-friendly   Govern
  Framework         deployment        configuration and    plugin/version
                    framework with    plugin ecosystem     choices; useful
                    configuration and                      for teams already
                    plugins                                standardized on
                                                           it

  AWS CDK           Defines           Reusable constructs, Abstractions can
                    infrastructure in abstractions, loops, hide generated
                    languages such as type checking,       resources; strong
                    TypeScript and    composition,         fit for larger
                    synthesizes       testable code        TypeScript
                    CloudFormation                         platforms

  Raw               Declarative AWS   Direct control of    Verbose, but
  CloudFormation    infrastructure    AWS properties and   useful for
                    templates         stack lifecycle      low-level control
  --------------------------------------------------------------------------

### Interview answer: why CDK?

"If a team is TypeScript-heavy, I like CDK because I can define
infrastructure in the same language as the application, create reusable
constructs, share security and monitoring defaults, and test synthesized
CloudFormation templates. I still inspect the generated template and
understand CloudFormation. For a smaller AWS-only serverless service,
SAM may be simpler."

**Be honest:** If you have not used a tool in production, say you have
studied or prototyped it rather than claiming production experience.

### CDK example: Lambda + SQS

``` ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";

export class OrdersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dlq = new sqs.Queue(this, "OrdersDLQ");

    const queue = new sqs.Queue(this, "OrdersQueue", {
      visibilityTimeout: cdk.Duration.seconds(180),
      deadLetterQueue: { queue: dlq, maxReceiveCount: 5 }
    });

    const worker = new lambda.Function(this, "OrdersWorker", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("dist"),
      timeout: cdk.Duration.seconds(30),
      environment: { ORDERS_QUEUE_URL: queue.queueUrl }
    });

    queue.grantConsumeMessages(worker);
    worker.addEventSource(new eventSources.SqsEventSource(queue, {
      batchSize: 10,
      reportBatchItemFailures: true
    }));
  }
}
```

This illustrates constructs and least-privilege grants. In production,
verify runtime support, visibility/batching configuration, encryption,
alarms, artifact layout, and the synthesized CloudFormation template for
your chosen CDK version.

------------------------------------------------------------------------

## 3. How CloudFormation works

CloudFormation provisions and updates AWS resources from a template. CDK
and SAM commonly synthesize or transform into CloudFormation resources.

-   **Template:** describes resources, parameters, outputs, conditions,
    and dependencies.
-   **Stack:** a managed collection of resources.
-   **Change set:** preview of proposed stack changes before execution.
-   **Rollback:** attempts to restore the prior state after a failed
    create/update.
-   **Drift:** actual resource configuration differs from expected
    template configuration.
-   **Nested stack:** a stack managed as a resource inside a parent
    stack.
-   **Stack policy:** can restrict updates to critical resources.

### Deployment flow

``` text
CDK/SAM source → synthesize/package → CloudFormation template
       → review change set → execute → monitor stack events
```

### Change sets and rollback

Change sets preview additions, modifications, replacements, and
deletions where CloudFormation can determine them. Review
replacements/deletions carefully for databases, queues, and storage
buckets. A change set is a useful preview, not a guarantee that every
runtime consequence is known.

When deployment fails, inspect stack events and the specific resource
error. Rollback itself can fail if resources changed or external
dependencies interfere. For stateful resources, use backups, retention
policies, snapshots, and careful replacement planning. Stack rollback is
not a substitute for data recovery.

### Drift detection

Drift detection compares supported actual resource properties with
expected template state; it may not detect every property or behavior.
Reconcile drift through reviewed IaC changes rather than treating
console edits as the normal workflow.

### 500-resource limit and nested stacks

CloudFormation has a default limit of **500 resources per stack** in
many standard account/region contexts. Verify current quotas for your
account and region.

Manage large deployments by splitting independent systems into stacks,
using nested stacks where modularity helps, separating foundation and
application stacks, and considering service-specific quotas. Nested
stacks add lifecycle and dependency considerations, so do not split
arbitrarily when resources need atomic changes.

**Interview line:** "I review change sets, monitor stack events, protect
stateful resources from accidental replacement, and use nested or
separate stacks when a template becomes too large."

------------------------------------------------------------------------

## 4. Multi-environment deployments: dev, QA, prod

### Common strategy

-   Separate stacks such as `orders-dev`, `orders-qa`, and
    `orders-prod`.
-   Prefer separate AWS accounts for production isolation where
    feasible.
-   Use environment-specific parameters for domains, VPCs, secret ARNs,
    feature flags, and scaling.
-   Reuse constructs while keeping environment differences explicit.
-   Never copy production secrets into lower environments.
-   Use least-privilege deployment roles and production approval gates.
-   Promote the same tested artifact between environments where
    possible.

### Stages vs versions vs aliases

  -----------------------------------------------------------------------
  Concept                             Meaning
  ----------------------------------- -----------------------------------
  Environment/stage                   Deployment environment, or API
                                      Gateway stage such as `dev`, `qa`,
                                      `prod`

  Lambda version                      Immutable snapshot of function code
                                      and configuration

  Lambda alias                        Named pointer to a version; can
                                      route weighted traffic between
                                      versions

  API Gateway stage                   Deployed API environment with
                                      stage-level config, logging,
                                      variables, and throttling
  -----------------------------------------------------------------------

A stage is not the same as a Lambda alias. API Gateway stages identify
API deployments; Lambda aliases select function versions.

Example: API Gateway `prod` stage integrates with Lambda alias `live`;
alias `live` points to a published version, not `$LATEST`.

------------------------------------------------------------------------

## 5. Safe Lambda deployments: versions, aliases, and CodeDeploy

A published Lambda version is immutable. An alias is a stable name that
can point to a version and can support weighted routing between
versions.

Example: version 41 is current production; version 42 is new. Alias
`live` routes 5% to version 42 while 95% remains on version 41. If
metrics are healthy, traffic shifts; if configured alarms fire,
CodeDeploy can stop and roll back traffic.

### Strategies

-   **All-at-once:** switch immediately.
-   **Canary:** shift a small percentage first, wait, then shift the
    rest.
-   **Linear:** increase traffic in defined increments over time.

### Useful CloudWatch alarms

-   Lambda `Errors`, `Duration`, and throttles.
-   API Gateway 5xx rate and latency.
-   Business metrics such as payment failures or order-processing
    errors.

Use meaningful evaluation periods and thresholds. Low-volume services
can produce noisy percentage metrics, so consider absolute error counts
and business signals.

``` text
Build artifact → publish Lambda version → update alias via CodeDeploy
     → shift small traffic percentage → evaluate alarms
        ├─ healthy: continue shifting
        └─ unhealthy: stop and roll back alias traffic
```

### Limitations

-   Rollback requires correct alarm, permission, and deployment
    configuration.
-   Code rollback does not undo database migrations or external side
    effects.
-   Use backward-compatible database migrations (expand → migrate →
    contract).
-   Keep event schemas compatible while old and new versions overlap.
-   Add pre-traffic and post-traffic hooks where appropriate.

**Interview line:** "I publish immutable Lambda versions, route
production through an alias, use CodeDeploy canary/linear traffic
shifting, and attach CloudWatch alarms. I also keep schema changes
backward-compatible because code rollback cannot undo data changes."

------------------------------------------------------------------------

## 6. End-to-end CI/CD pipeline

``` text
Pull request
  ↓
Install locked dependencies
  ↓
Lint + type-check
  ↓
Unit tests + security/dependency scans
  ↓
Build/bundle with esbuild
  ↓
IaC synth/validation + review changes
  ↓
Deploy to dev
  ↓
Smoke/integration tests
  ↓
Promote same artifact to QA
  ↓
Production approval
  ↓
Canary/linear rollout
  ↓
CloudWatch alarms + post-deploy verification
  ↓
Complete rollout or roll back
```

### Stage-by-stage

1.  **Install:** use `npm ci` and a lockfile. Do not expose secrets to
    untrusted pull-request jobs.
2.  **Lint/type-check:** ESLint and `tsc --noEmit`.
3.  **Test:** unit tests, API/event contract tests, authorization and
    idempotency tests.
4.  **Security:** dependency/artifact scans; inspect IaC for broad IAM,
    public exposure, and missing encryption.
5.  **Build:** bundle TypeScript/JavaScript with esbuild; verify
    dependency packaging for the target runtime.
6.  **Validate IaC:** CDK synth, SAM validation/build, policy checks,
    CloudFormation change review.
7.  **Deploy dev:** deploy infrastructure and artifact, then
    smoke/integration test.
8.  **Promote:** use the same tested artifact with environment-specific
    configuration.
9.  **Production:** approval gate and alias traffic shifting.
10. **Verify/recover:** smoke tests, metrics, logs, rollback if checks
    fail; record commit SHA and deployment result.

### GitHub Actions starter outline

This is a starting point, not a complete production workflow. Configure
AWS OIDC trust, deployment roles, environment protections, and artifact
promotion before use.

``` yaml
name: orders-service-ci

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --runInBand
      - run: npm run build
      - run: npx cdk synth
```

For production, use a separately protected environment, restricted OIDC
trust, least-privilege deployment roles, promotion of the tested
artifact, traffic shifting, and smoke tests. Pin third-party actions to
trusted immutable versions/SHAs according to your supply-chain policy.

------------------------------------------------------------------------

## 7. Smoke tests vs unit vs integration tests

  -----------------------------------------------------------------------
  Test type               Purpose                 Example
  ----------------------- ----------------------- -----------------------
  Unit                    Test one function in    Validate order payload
                          isolation               

  Integration             Test component          Lambda processes SQS
                          interaction             and writes to DynamoDB

  Contract                Verify API/event shape  Consumer accepts
                                                  versioned `OrderPlaced`
                                                  event

  Smoke                   Basic deployed-system   Call health endpoint
                          health                  and perform a safe test
                                                  operation

  Canary validation       Check new version on a  Observe errors and
                          small amount of traffic business metrics before
                                                  full rollout
  -----------------------------------------------------------------------

Smoke tests should be fast and safe to repeat. Avoid real payments,
customer emails, or destructive production data changes without explicit
safeguards.

------------------------------------------------------------------------

## 8. Production scenario questions

### A. Deployment unexpectedly deletes a production table

Review change sets, use retention/backups, separate stateful resources
from frequently changing application stacks, and restrict production
deploy permissions.

### B. CDK works in dev but fails in production

Compare account/region, bootstrap setup, IAM, quotas, parameters, secret
ARNs, and dependencies. Inspect CloudFormation events and template
differences; do not blindly widen permissions.

### C. New Lambda version causes 5xx errors

Use CodeDeploy canary shifting and CloudWatch alarms; stop rollout and
route alias traffic back. Investigate logs/traces and verify data/event
schema compatibility.

### D. Dev and production have drifted

Run drift detection where supported, compare actual state with IaC, and
reconcile through reviewed code changes.

### E. CI uses long-lived AWS access keys

Prefer short-lived credentials through CI OIDC federation and narrowly
scoped IAM roles, where supported.

### F. Deployment succeeds but API is broken

Add smoke tests for critical paths, not just stack success. Monitor
alarms and roll back alias traffic when safe.

### G. Stack exceeds resource limit

Split independent components into stacks or use nested stacks where
lifecycle modularity makes sense. Consider service-specific quotas too.

### H. New DB schema breaks old Lambda version

Use expand-migrate-contract: add compatible fields, deploy code
supporting both shapes, migrate data, then remove old fields after
consumers are compatible.

------------------------------------------------------------------------

## 9. Quick interview questions

**Q1. SAM vs CDK?** SAM provides concise serverless templates; CDK uses
programming languages and reusable constructs, synthesizing
CloudFormation.

**Q2. Why CDK?** Type-safe infrastructure code, reusable constructs,
abstractions, and testing---but inspect the synthesized template.

**Q3. What is a CloudFormation stack?** A managed collection of
resources created and updated from a template.

**Q4. Why use change sets?** Preview proposed changes before applying
them, especially replacements and deletions.

**Q5. What is drift?** A difference between supported actual resource
configuration and expected template configuration.

**Q6. Why nested stacks?** Modularize a large deployment and help manage
resource count and template complexity.

**Q7. Stage vs alias?** API Gateway stage represents an API deployment
environment; Lambda alias points to one or more published Lambda
versions.

**Q8. How does Lambda canary work?** Publish a new version, shift a
small traffic percentage through an alias, monitor alarms, then continue
or roll back.

**Q9. What can rollback not fix?** Irreversible side effects,
incompatible data migrations, or schema changes that remain after code
rollback.

**Q10. Good CI/CD sequence?** Install → lint/type-check → test/scan →
build → IaC validation → deploy → smoke test → promote → canary →
verify/rollback.

**Q11. How should CI authenticate to AWS?** Prefer short-lived OIDC role
assumption with narrow trust and permissions.

**Q12. Why promote the same artifact?** It reduces differences between
what was tested and what reaches production.

------------------------------------------------------------------------

## 10. Final 30-second revision

-   **SAM:** AWS-focused serverless templates and local tooling.
-   **Serverless Framework:** configuration-driven framework with a
    plugin ecosystem.
-   **CDK:** real code, reusable constructs, CloudFormation synthesis.
-   **CloudFormation:** templates, stacks, change sets, rollback, drift,
    nested stacks.
-   **500-resource limit:** common default quota per stack; verify
    current account/region quotas.
-   **Environments:** isolate configuration/accounts and promote the
    same artifact.
-   **Lambda version:** immutable snapshot.
-   **Lambda alias:** stable pointer and weighted traffic routing.
-   **CodeDeploy:** canary/linear rollout and alarm-driven rollback when
    configured.
-   **CI/CD:** lint → type-check → test → scan → esbuild → IaC
    validation → deploy → smoke test → promote → canary → verify.
-   **Rollback:** restores traffic/code, not necessarily database
    changes or external effects.
-   **Production safety:** protected approvals, least-privilege deploy
    roles, observability, backward-compatible migrations.

### Strong senior-level closing answer

"I treat infrastructure and application code as one reviewed release.
The pipeline validates code and IaC, creates a repeatable artifact,
deploys it to isolated environments, runs smoke tests, and promotes it
through a controlled production rollout. For Lambda, I use published
versions and aliases with canary or linear traffic shifting and
CloudWatch alarms. I plan rollback boundaries carefully, especially for
database migrations and external side effects."
