# AWS Lambda Testing Interview Guide

## Jest, AWS SDK Mocking, Integration Tests, SAM Local, and LocalStack

Senior-level Node.js/TypeScript interview preparation with practical
code examples, test strategy, and production scenarios.

------------------------------------------------------------------------

## 1. Lambda testing strategy: what to test at each level

**Easy answer:** Use fast unit tests for business logic, integration
tests for AWS/service interactions, and a smaller number of end-to-end
tests for critical user journeys.

  -------------------------------------------------------------------------
  Test level          What it verifies  AWS access        Typical
                                                          speed/cost
  ------------------- ----------------- ----------------- -----------------
  Unit                Validation,       No; mock          Fast and cheap
                      branching, error  dependencies      
                      handling,                           
                      business rules                      

  Component/handler   Lambda event      Usually mocked    Fast
  test                parsing and       dependencies      
                      response behavior                   

  Local integration   App behavior      LocalStack or     Moderate
                      against local     local containers  
                      AWS-compatible                      
                      services                            

  Real AWS            IAM, event-source Yes, isolated AWS Slower and can
  integration         mappings, actual  test environment  cost money
                      service behavior,                   
                      deployed config                     

  End-to-end/smoke    Critical deployed Yes, test         Slowest; keep
                      workflow across   environment       targeted
                      multiple services                   
  -------------------------------------------------------------------------

**Interview line:** "I test business rules quickly with Jest, mock AWS
SDK calls at the boundary, then use isolated real AWS integration tests
for IAM, event mappings, retries, and service-specific behavior."

------------------------------------------------------------------------

## 2. Structure code so Lambda logic is testable

Keep business logic separate from the Lambda adapter. The handler should
parse the event, call application logic, and map the result to an AWS
response.

Example structure:

``` text
src/
  handler.ts
  order-service.ts
  repository.ts
tests/
  handler.test.ts
  order-service.test.ts
  repository.test.ts
```

### Example business logic

``` ts
// src/order-service.ts
export type Order = {
  orderId: string;
  total: number;
};

export function validateOrder(input: unknown): Order {
  if (
    typeof input !== "object" ||
    input === null ||
    !("orderId" in input) ||
    typeof input.orderId !== "string" ||
    input.orderId.trim() === "" ||
    !("total" in input) ||
    typeof input.total !== "number" ||
    input.total <= 0
  ) {
    throw new Error("Invalid order");
  }

  return {
    orderId: input.orderId,
    total: input.total
  };
}
```

### Unit test with Jest

``` ts
// tests/order-service.test.ts
import { validateOrder } from "../src/order-service";

describe("validateOrder", () => {
  it("accepts a valid order", () => {
    expect(validateOrder({ orderId: "o-123", total: 25 })).toEqual({
      orderId: "o-123",
      total: 25
    });
  });

  it("rejects a non-positive total", () => {
    expect(() =>
      validateOrder({ orderId: "o-123", total: 0 })
    ).toThrow("Invalid order");
  });

  it("rejects malformed input", () => {
    expect(() => validateOrder(null)).toThrow("Invalid order");
  });
});
```

**Why this is good:** The business rules are tested without constructing
a Lambda event or making any network calls.

------------------------------------------------------------------------

## 3. Unit-testing a Lambda handler with Jest

A handler test should verify: - Valid event → expected status/body. -
Invalid event → controlled client error. - Dependency failure → expected
error behavior. - Required downstream call occurs with expected input. -
Logs and responses do not leak secrets.

Example handler:

``` ts
// src/handler.ts
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { createOrder } from "./order-service";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  let body: unknown;

  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON" })
    };
  }

  try {
    const order = await createOrder(body);

    return {
      statusCode: 201,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order)
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid order") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid order" })
      };
    }

    throw error;
  }
};
```

In production, avoid using error-message strings as the only error
classification mechanism. Prefer typed domain errors and centralized
error mapping.

### Example handler test

``` ts
// tests/handler.test.ts
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { handler } from "../src/handler";
import * as orderService from "../src/order-service";

jest.mock("../src/order-service");

const mockedCreateOrder = jest.mocked(orderService.createOrder);

function makeEvent(body: string | null): APIGatewayProxyEventV2 {
  return {
    version: "2.0",
    routeKey: "POST /orders",
    rawPath: "/orders",
    rawQueryString: "",
    headers: {},
    requestContext: {} as APIGatewayProxyEventV2["requestContext"],
    isBase64Encoded: false,
    body
  } as APIGatewayProxyEventV2;
}

describe("POST /orders handler", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 201 when order creation succeeds", async () => {
    mockedCreateOrder.mockResolvedValue({
      orderId: "o-123",
      total: 25
    });

    const response = await handler(makeEvent('{"orderId":"o-123","total":25}'), {} as never, () => {});

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body ?? "{}")).toEqual({
      orderId: "o-123",
      total: 25
    });
  });

  it("returns 400 for invalid JSON", async () => {
    const response = await handler(makeEvent("{bad json"), {} as never, () => {});

    expect(response.statusCode).toBe(400);
    expect(mockedCreateOrder).not.toHaveBeenCalled();
  });
});
```

Adapt the handler type and event factory to your Lambda integration (API
Gateway REST API, HTTP API, ALB, SQS, EventBridge, etc.). Keep test
fixtures representative of actual AWS event shapes.

------------------------------------------------------------------------

## 4. Mocking AWS SDK v3 with `aws-sdk-client-mock`

AWS SDK v3 uses command objects. `aws-sdk-client-mock` can stub SDK
client calls without making real AWS requests.

Install:

``` bash
npm install --save-dev aws-sdk-client-mock aws-sdk-client-mock-jest
```

Example production code using DynamoDB Document Client:

``` ts
// src/repository.ts
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export async function getOrder(
  db: DynamoDBDocumentClient,
  tableName: string,
  orderId: string
) {
  const response = await db.send(new GetCommand({
    TableName: tableName,
    Key: { orderId }
  }));

  return response.Item;
}
```

### Test the SDK command

``` ts
// tests/repository.test.ts
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { getOrder } from "../src/repository";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("getOrder", () => {
  beforeEach(() => ddbMock.reset());

  it("returns the item returned by DynamoDB", async () => {
    ddbMock.on(GetCommand, {
      TableName: "OrdersTest",
      Key: { orderId: "o-123" }
    }).resolves({
      Item: { orderId: "o-123", status: "PAID" }
    });

    const db = DynamoDBDocumentClient.from(
      // In a real test, pass a real DynamoDBClient instance configured
      // for unit tests; the SDK mock prevents network calls.
      new (await import("@aws-sdk/client-dynamodb")).DynamoDBClient({})
    );

    await expect(getOrder(db, "OrdersTest", "o-123")).resolves.toEqual({
      orderId: "o-123",
      status: "PAID"
    });

    expect(ddbMock).toHaveReceivedCommandWith(GetCommand, {
      TableName: "OrdersTest",
      Key: { orderId: "o-123" }
    });
  });
});
```

### Mock failures too

``` ts
ddbMock.on(GetCommand).rejects(
  Object.assign(new Error("temporary failure"), {
    name: "ServiceUnavailableException"
  })
);
```

Test that the application handles the failure correctly: retry if
appropriate, return a controlled response, or let Lambda retry for an
asynchronous event source.

### Important mocking practices

-   Mock the **client class** used by production code and the correct
    command type.
-   Reset mocks between tests with `reset()` to avoid leaking behavior.
-   Test success, not-found, validation, throttling/transient failure,
    and permission-denied cases.
-   Avoid mocking every internal helper; mock external boundaries and
    test business logic directly.
-   Keep unit tests offline and deterministic.
-   A mock proves how your code responds to a simulated SDK result; it
    does not prove that IAM, networking, service configuration, or AWS
    behavior is correct.

------------------------------------------------------------------------

## 5. Testing SQS- and EventBridge-triggered Lambdas

For event-driven handlers, create fixtures matching the AWS event
contract.

### SQS handler test cases

-   Valid record succeeds.
-   Invalid record is reported as failed when partial batch response is
    enabled.
-   One failure does not mark unrelated successful records as failed.
-   Duplicate event is safe due to idempotency.
-   Poison message eventually reaches the DLQ in an integration test.

Example SQS event fixture:

``` ts
import type { SQSEvent } from "aws-lambda";

export const sqsEvent: SQSEvent = {
  Records: [{
    messageId: "msg-1",
    receiptHandle: "receipt",
    body: JSON.stringify({ eventId: "evt-1", orderId: "o-123" }),
    attributes: {
      ApproximateReceiveCount: "1",
      SentTimestamp: "1700000000000",
      SenderId: "test",
      ApproximateFirstReceiveTimestamp: "1700000000000"
    },
    messageAttributes: {},
    md5OfBody: "test",
    eventSource: "aws:sqs",
    eventSourceARN: "arn:aws:sqs:us-east-1:111111111111:orders-test",
    awsRegion: "us-east-1"
  }]
};
```

For EventBridge, test matching `source`, `detail-type`, payload
validation, duplicate event handling, and unsupported schema versions.

------------------------------------------------------------------------

## 6. Integration testing against real AWS

Real AWS integration tests verify behavior that mocks cannot reliably
prove: - IAM execution roles and resource policies. - KMS key policies
and encryption behavior. - API Gateway/Lambda wiring and environment
variables. - SQS visibility timeout, DLQ redrive, and event-source
mapping. - EventBridge rules and target permissions. - Actual DynamoDB
condition expressions and consistency behavior. - VPC networking,
endpoints, DNS, and downstream access. - Runtime packaging and
deployment configuration.

### Safe integration-test design

1.  Use a dedicated test account or isolated AWS environment.
2.  Create uniquely named resources or a dedicated test stack.
3.  Use short-lived credentials via OIDC/role assumption where
    supported.
4.  Restrict permissions to test resources.
5.  Use synthetic test data, never production customer data.
6.  Make tests repeatable and idempotent.
7.  Add cleanup even when assertions fail.
8.  Set budgets/alarms and tear down temporary resources.
9.  Keep destructive tests away from production.
10. Test IAM denials as well as successful access where security
    matters.

### Example integration flow

``` text
Deploy test stack
  → Put test item / send test message
  → Invoke deployed Lambda or trigger real event source
  → Poll for expected result with a bounded timeout
  → Assert output/state/logs as needed
  → Clean up resources
```

Use bounded polling rather than fixed long sleeps, because event
processing is asynchronous. Account for eventual consistency and retry
behavior.

### What should not be tested only with mocks?

-   Whether the Lambda role actually has required permissions.
-   Whether a queue policy allows the correct SNS topic.
-   Whether the event-source mapping is configured correctly.
-   Whether a KMS key policy permits decryption.
-   Whether a deployed artifact contains all runtime dependencies.

------------------------------------------------------------------------

## 7. Local testing with SAM CLI

AWS SAM CLI can build and invoke Lambda functions locally using
container-based runtimes and can run a local API for supported event
sources.

Typical commands:

``` bash
sam build
sam local invoke OrdersFunction --event events/api-gateway.json
sam local start-api
```

For a local API: 1. Define the function and API event in
`template.yaml`. 2. Build with `sam build`. 3. Start the local API with
`sam local start-api`. 4. Send requests to the local endpoint. 5.
Inspect logs and compare the behavior with expected responses.

### Strengths

-   Useful for handler/event-shape testing.
-   Can run in a Lambda-like container environment.
-   Helps catch packaging and runtime issues before deployment.

### Limitations

-   Local execution does not automatically reproduce IAM, every
    managed-service behavior, production networking, event-source
    retries, or all AWS integrations.
-   Some calls still target real AWS unless configured to use local
    endpoints or mocked dependencies.
-   A local pass does not replace deployed integration tests.

Use synthetic events that match real AWS payloads and keep the test
template close to deployment configuration.

------------------------------------------------------------------------

## 8. LocalStack

LocalStack provides local emulation for many AWS APIs, useful for
integration-style tests without provisioning every test resource in a
real AWS account.

Common workflow: 1. Start LocalStack with the required services. 2.
Configure the AWS SDK endpoint and test credentials for local use. 3.
Create test resources (or deploy supported IaC). 4. Run
application/tests against those endpoints. 5. Tear down resources after
the test suite.

### Example AWS SDK client configuration

``` ts
import { SQSClient } from "@aws-sdk/client-sqs";

const isLocal = process.env.AWS_ENDPOINT_URL !== undefined;

const sqs = new SQSClient({
  ...(isLocal
    ? { endpoint: process.env.AWS_ENDPOINT_URL }
    : {}),
  region: process.env.AWS_REGION ?? "us-east-1",
  ...(isLocal
    ? { credentials: { accessKeyId: "test", secretAccessKey: "test" } }
    : {})
});
```

Use local-only dummy credentials and never configure a local endpoint in
production. Keep the local endpoint explicit in test configuration.

### SAM Local vs LocalStack vs real AWS

  -----------------------------------------------------------------------
  Option                  Best for                Main limitation
  ----------------------- ----------------------- -----------------------
  Jest + SDK mocks        Fast isolated logic and Cannot validate real
                          error-path tests        AWS permissions/service
                                                  behavior

  SAM Local               Lambda runtime,         Does not emulate all
                          packaging, and          managed services and
                          event/handler behavior  deployment behavior

  LocalStack              Local integration       Emulation can differ
                          between supported       from AWS and service
                          AWS-like services       coverage varies

  Real AWS test           IAM, managed-service    Costs money, slower,
  environment             integration, deployed   requires
                          behavior                isolation/cleanup
  -----------------------------------------------------------------------

**Interview line:** "I use Jest for the bulk of tests, SAM Local to
validate runtime/event handling, LocalStack for supported local service
interactions, and a smaller real-AWS suite for permissions, event
mappings, and deployment behavior."

------------------------------------------------------------------------

## 9. Jest setup for TypeScript

Common approaches include `ts-jest` or Babel/SWC-based transforms. Pick
one setup and keep it aligned with your module system.

Example `package.json` scripts:

``` json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Illustrative Jest config using `ts-jest`:

``` ts
// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/"]
};

export default config;
```

Install matching Jest and `ts-jest` versions for your project. If using
ESM, configure Jest for ESM explicitly rather than copying a CommonJS
configuration unchanged.

### Coverage guidance

Coverage is useful, but 100% line coverage does not guarantee good
tests. Prioritize meaningful cases: - Success and failure branches. -
Invalid inputs and boundary values. - Authorization boundaries. -
Duplicate event delivery. - Retryable vs non-retryable errors. - Timeout
and partial failure behavior.

------------------------------------------------------------------------

## 10. Production scenario questions

### A. Jest passes, but Lambda fails in AWS

Check the deployed artifact/runtime, environment variables, IAM
execution role, resource policies, KMS permissions, VPC/networking,
event shape, and service configuration. Mocks may have hidden a real
integration issue.

### B. Test suite occasionally fails because messages arrive late

Use bounded polling with retry/backoff, unique test identifiers, and
clear timeouts. Do not rely on arbitrary sleeps or shared queue state.

### C. SQS handler fails one record in a batch

Test partial batch response: successful records remain successful, and
only failed message IDs are returned. Verify the event-source mapping
enables `ReportBatchItemFailures`.

### D. You need to verify least-privilege IAM

Deploy an isolated real-AWS test and assert the intended action succeeds
while an unauthorized action is denied. Review CloudTrail and policy
simulation as supporting evidence.

### E. LocalStack test passes but real AWS fails

Check service emulation differences, IAM/key policies, regional
configuration, account boundaries, quotas, networking, and deployment
artifacts. Keep critical real-AWS tests for behavior that emulation
cannot prove.

### F. A test accidentally sends a real customer email

Use dedicated test resources and destinations, environment guards,
synthetic data, and explicit safety checks. Never depend on a developer
remembering not to run a destructive test.

------------------------------------------------------------------------

## 11. Quick interview questions

**Q1. What should be unit tested in a Lambda?**\
Business rules, validation, branching, error handling, event parsing,
and response mapping.

**Q2. Why mock the AWS SDK?**\
To make tests fast, deterministic, offline, and able to simulate success
and failure paths.

**Q3. What does `aws-sdk-client-mock` mock?**\
AWS SDK v3 client commands and their resolved/rejected results.

**Q4. Does an SDK mock prove IAM permissions?**\
No. Test IAM and resource policies in a real AWS environment.

**Q5. SAM Local vs LocalStack?**\
SAM Local focuses on running Lambda-like code and events locally;
LocalStack emulates supported AWS services for local integration.

**Q6. Why test against real AWS?**\
To verify actual IAM, KMS, event-source mappings, managed-service
semantics, and deployment configuration.

**Q7. How do you test an asynchronous SQS workflow?**\
Send a uniquely identified message, poll for a bounded period, assert
final state, and clean up test resources.

**Q8. What should be mocked?**\
External boundaries and expensive/remote dependencies in unit tests;
avoid mocking every internal function.

**Q9. How do you test retries and DLQs?**\
Use integration tests in an isolated environment with controlled
failures, configured redrive policy, and bounded polling.

**Q10. Is code coverage enough?**\
No. Test important behaviors, failure modes, security boundaries,
duplicate delivery, and integration configuration.

------------------------------------------------------------------------

## 12. Final 30-second revision

-   **Jest:** fast unit and handler tests.
-   **SDK v3 mocking:** `aws-sdk-client-mock` stubs client commands.
-   **Unit tests:** business rules, success/failure branches,
    validation, idempotency.
-   **Integration tests:** actual IAM, KMS, API wiring, SQS mappings,
    retries, DLQs.
-   **SAM Local:** Lambda-like runtime and event testing.
-   **LocalStack:** local integration against supported AWS API
    emulations.
-   **Real AWS:** essential for behaviors that mocks/emulators cannot
    prove.
-   **Test safety:** isolated account/stack, synthetic data, short-lived
    credentials, cleanup, budgets.
-   **Async tests:** unique IDs and bounded polling, not arbitrary
    sleeps.
-   **Coverage:** measure it, but prioritize meaningful behavior and
    risk.

### Strong senior-level closing answer

"I use a testing pyramid: many fast Jest unit tests, handler tests with
AWS SDK v3 mocks, local runtime/integration checks using SAM or
LocalStack where suitable, and a smaller isolated real-AWS suite for
IAM, KMS, event-source mappings, retries, and deployment configuration.
I keep tests deterministic, use synthetic data, and clean up resources
even when assertions fail."
