# TypeScript Interview Guide

## Senior-Level Questions, Easy Explanations, Code Examples, and Real Scenarios

> **Study method:** Learn the short answer, understand the code, then
> explain the scenario aloud in 60--90 seconds.

## 1. `interface` vs `type`

### Q1. What is the difference?

**Easy answer:** Both describe data shapes. Use `interface` often for
extensible object contracts; use `type` for unions, intersections,
primitives, tuples, and other type expressions. They overlap, so team
consistency matters.

``` ts
interface User {
  id: string;
  name: string;
}

type Product = {
  id: string;
  price: number;
};

type Status = "pending" | "approved" | "rejected";
```

  -----------------------------------------------------------------------
  Feature                 `interface`             `type`
  ----------------------- ----------------------- -----------------------
  Describe object shape   Yes                     Yes

  Extend/combine          `extends`               Intersection `&`

  Union / primitive alias Not directly            Yes

  Declaration merging     Yes                     No

  Class `implements`      Yes                     Object-shaped aliases
                                                  can also be implemented
  -----------------------------------------------------------------------

``` ts
interface Person { name: string }
interface Employee extends Person { employeeId: string }

type HasName = { name: string };
type Staff = HasName & { employeeId: string };
```

**Real scenario:** Use an interface for a shared user contract that
modules extend. Use a type alias for a finite status union or an event
that can have several shapes.

**Interview answer:** "Both can describe object shapes. Interfaces
support declaration merging and are commonly used for extensible
contracts. Type aliases are more flexible for unions, intersections,
primitives, and tuples. I choose based on the use case and team
conventions."

## 2. Generics

### Q2. What are generics?

Generics let reusable code preserve the relationship between input and
output types. Use `T` instead of throwing away type information with
`any`.

``` ts
function identity<T>(value: T): T {
  return value;
}

const name = identity("Sam"); // string
const count = identity(42);   // number
```

### Q3. How do you constrain a generic?

Use `extends` to require a property or capability.

``` ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}

getId({ id: "u1", name: "Asha" }); // OK
// getId({ name: "Asha" });        // Compile error
```

### Q4. Give a real generic API example

``` ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface User {
  id: string;
  name: string;
}

const response: ApiResponse<User> = {
  data: { id: "u1", name: "Asha" },
  success: true
};
```

**Scenario:** A shared API client uses the same response envelope for
users, products, and orders while preserving the correct data type.

**Interview answer:** "Generics let us reuse functions and types while
keeping precise input-output relationships. I use them in API response
wrappers, repositories, pagination, and reusable utilities. Constraints
ensure a generic has the properties the implementation needs."

## 3. Utility types: `Partial`, `Pick`, `Omit`, `Record`

### Q5. `Partial<T>`

Makes every property optional, useful for update inputs.

``` ts
interface User {
  id: string;
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;
const changes: UpdateUser = { name: "Asha" };
```

**Scenario:** The user changes only their name. Be careful:
`Partial<User>` also makes `id` optional. For an update DTO, exclude
immutable fields:

``` ts
type UpdateUserInput = Partial<Omit<User, "id">>;
```

### Q6. `Pick<T, K>`

Keeps only selected properties.

``` ts
type UserSummary = Pick<User, "id" | "name">;
const summary: UserSummary = { id: "u1", name: "Asha" };
```

**Scenario:** A list view needs only ID and display name.

### Q7. `Omit<T, K>`

Removes selected properties.

``` ts
type CreateUserInput = Omit<User, "id">;
const newUser: CreateUserInput = {
  name: "Asha",
  email: "asha@example.com"
};
```

**Scenario:** The server generates the database ID.

### Q8. `Record<K, V>`

Creates an object mapping keys of type `K` to values of type `V`.

``` ts
type Role = "admin" | "editor" | "viewer";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"]
};
```

**Scenario:** Every known role must have a permissions entry.

**Memory trick:** Partial = fields optional; Pick = keep; Omit = remove;
Record = map keys to values.

### Q9. Combine utility types

``` ts
interface Order {
  id: string;
  customerId: string;
  total: number;
  status: "new" | "paid" | "cancelled";
}

type OrderSummary = Pick<Order, "id" | "total" | "status">;
type CreateOrderInput = Omit<Order, "id">;
type UpdateOrderInput = Partial<Pick<Order, "status">>;
type OrdersById = Record<string, Order>;
```

Explain which fields are needed for a list view, create request, update
request, and ID-keyed lookup.

## 4. `unknown` vs `any`

### Q10. What is the difference?

**Easy answer:** `any` disables most type checking. `unknown` means "I
don't know the type yet," so you must narrow or validate it before use.

``` ts
let unsafe: any = "hello";
unsafe.toFixed(); // Compiles, fails at runtime.

let safe: unknown = "hello";
// safe.toUpperCase(); // Error until narrowed

if (typeof safe === "string") {
  console.log(safe.toUpperCase());
}
```

For non-trivial external data, use a runtime schema validator.

``` ts
function parseJson(text: string): unknown {
  return JSON.parse(text);
}
```

**Scenario:** A third-party API changes its response. Treat raw data as
`unknown`, validate it at the boundary, and only then pass it into
business logic.

**Interview answer:** "I prefer unknown for untrusted data because it
forces type narrowing. Any allows unchecked operations and can hide
bugs. TypeScript types disappear at runtime, so external input needs
runtime validation."

## 5. Why TypeScript types do not validate runtime input

### Q11. Is a typed request body automatically safe?

**No.** TypeScript checks code at compile time; HTTP JSON, environment
variables, SQS bodies, and external API responses arrive at runtime.
Type assertions do not validate them.

``` ts
interface CreateUserInput { email: string }

// Unsafe: assertion does not validate the value.
const body = JSON.parse('{"email": 123}') as CreateUserInput;
```

Remember: **TypeScript type = compile-time contract; Zod/Joi schema =
runtime validation.**

## 6. Runtime validation with Zod

### Q12. How do you validate data with Zod?

Install: `npm install zod`

``` ts
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(18).optional()
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

function createUser(rawInput: unknown) {
  const parsed = CreateUserSchema.safeParse(rawInput);

  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.issues };
  }

  // parsed.data is validated and typed.
  return { ok: true as const, user: parsed.data };
}
```

`safeParse()` returns success/failure instead of throwing for normal
validation failures. `parse()` throws on invalid input.

**Scenario:** Before inserting a registration into the database,
validate email format, lengths, and business constraints. Validation
does not replace authentication, authorization, or database constraints.

## 7. Runtime validation with Joi

### Q13. How does Joi compare with Zod?

Both validate at runtime. Zod is TypeScript-first and supports inferred
types; Joi is a mature validator with rich schema options.

Install: `npm install joi`

``` ts
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).optional()
});

function validateInput(input: unknown) {
  const { error, value } = schema.validate(input, {
    abortEarly: false,
    convert: false
  });

  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, value };
}
```

`convert: false` prevents Joi coercing values such as numeric strings.
Decide coercion behavior intentionally.

**Interview comparison:** Choose Zod when inferred TypeScript types are
useful; choose Joi if your team already uses it or prefers its
ecosystem. Neither replaces business rules or authorization.

## 8. Typing AWS Lambda handlers

### Q14. How do you type an API Gateway Lambda handler?

Install types: `npm install --save-dev @types/aws-lambda`

``` ts
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from "aws-lambda";
import { z } from "zod";

const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let rawBody: unknown;

  try {
    rawBody = event.body ? JSON.parse(event.body) : undefined;
  } catch {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Invalid JSON body" })
    };
  }

  const parsed = BodySchema.safeParse(rawBody);

  if (!parsed.success) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "Invalid request",
        issues: parsed.error.issues.map(issue => ({
          path: issue.path,
          message: issue.message
        }))
      })
    };
  }

  console.log("Request ID:", context.awsRequestId);

  return {
    statusCode: 201,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "User accepted", data: parsed.data })
  };
};
```

**Important:** - `event.body` is a string or `null`, not a validated
object. - JSON parsing can fail; valid JSON can still have the wrong
shape. - Use `APIGatewayProxyEventV2` for API Gateway HTTP API payload
format v2; match the type to your configured integration. - Do not
expose stack traces or secrets in client responses.

### Q15. How do you type an SQS Lambda handler?

SQS messages contain a string body, so parse and validate each record.

``` ts
import type { SQSHandler, SQSRecord } from "aws-lambda";
import { z } from "zod";

const JobSchema = z.object({
  jobId: z.string(),
  action: z.enum(["CREATE", "UPDATE"])
});

async function processRecord(record: SQSRecord): Promise<void> {
  let raw: unknown;

  try {
    raw = JSON.parse(record.body);
  } catch {
    throw new Error("Invalid JSON in SQS message");
  }

  const parsed = JobSchema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid SQS message schema");

  console.log("Processing job:", parsed.data.jobId);
}

export const handler: SQSHandler = async event => {
  for (const record of event.Records) {
    await processRecord(record);
  }
};
```

### Production scenario: partial batch failures

By default, a failed batch may cause messages already processed
successfully to be retried. Enable `ReportBatchItemFailures` on the
event source mapping and return failed message IDs so successful records
can be acknowledged independently.

``` ts
import type { SQSHandler, SQSBatchResponse, SQSRecord } from "aws-lambda";

export const handler: SQSHandler = async event => {
  const batchItemFailures: SQSBatchResponse["batchItemFailures"] = [];

  await Promise.all(event.Records.map(async (record: SQSRecord) => {
    try {
      await processRecord(record);
    } catch (error) {
      console.error("Record failed", { messageId: record.messageId, error });
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }));

  return { batchItemFailures };
};
```

In production, cap concurrency for expensive work, configure the event
source mapping for partial batch responses, and make processing
idempotent because SQS delivery is at least once.

**Interview answer:** "I choose the event type that matches the trigger,
parse and validate body data at runtime, and explicitly design for
retries, partial failures, and duplicate delivery."

## 9. Real-world TypeScript scenarios

### Q16. Frontend sends `age: "25"` but API expects a number. What do you do?

Decide whether numeric strings are allowed. Validate at the boundary;
coerce only if the API contract permits it.

``` ts
const StrictSchema = z.object({ age: z.number().int().min(0) });
const CoercingSchema = z.object({ age: z.coerce.number().int().min(0) });
```

Do not accept unexpected coercions without testing the validator's
behavior.

### Q17. How do you stop clients changing database IDs on update?

Do not accept the full database entity as the update DTO. Exclude
immutable fields in the type and runtime schema.

``` ts
interface Account {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

type UpdateAccountInput =
  Partial<Pick<Account, "email" | "displayName">>;
```

TypeScript alone cannot prevent incoming JSON from containing extra
fields; validate the request and allow only intended properties.

### Q18. A third-party API changes its response. How do you protect your service?

Treat the response as `unknown`, validate at the integration boundary,
and map it into an internal domain type.

``` ts
const ExternalUserSchema = z.object({
  id: z.string(),
  full_name: z.string()
});

type DomainUser = { id: string; name: string };

function toDomainUser(raw: unknown): DomainUser {
  const external = ExternalUserSchema.parse(raw);
  return { id: external.id, name: external.full_name };
}
```

### Q19. How do you type a paginated API response?

``` ts
interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

interface Product { id: string; title: string }

const products: Page<Product> = {
  items: [{ id: "p1", title: "Keyboard" }],
  page: 1,
  pageSize: 20,
  total: 1
};
```

Use a generic envelope so every endpoint retains its item type.

### Q20. How do you restrict status values?

``` ts
type PaymentStatus = "pending" | "paid" | "failed";

function updateStatus(status: PaymentStatus) {
  // ...
}

updateStatus("paid");
// updateStatus("complete"); // Compile-time error
```

For values from external JSON, validate at runtime as well.

### Q21. How do you model success and failure safely?

Use a discriminated union.

``` ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };

function printResult(result: Result<string>) {
  if (result.ok) console.log(result.data);
  else console.error(result.error.code, result.error.message);
}
```

**Scenario:** A service returns expected business failures in a
predictable shape, while exceptional failures can still use thrown
errors.

## 10. Additional common TypeScript questions

### Q22. What is type inference?

TypeScript infers types from assigned values and return expressions.

``` ts
const count = 3;      // number
const title = "Hi";   // string
```

Let inference handle obvious local variables, but explicitly type public
APIs and important contracts.

### Q23. Union vs intersection?

-   `A | B`: value can be either A or B.
-   `A & B`: value must satisfy both A and B.

``` ts
type Id = string | number;
type Timestamped = { createdAt: Date };
type Named = { name: string };
type NamedAndTimestamped = Named & Timestamped;
```

### Q24. What is type narrowing?

Runtime checks make a broad type more specific.

``` ts
function format(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}
```

### Q25. What is a discriminated union?

A union whose members share a literal property used to identify the
variant.

``` ts
type DomainEvent =
  | { kind: "created"; id: string }
  | { kind: "deleted"; id: string; reason: string };

function handle(event: DomainEvent) {
  switch (event.kind) {
    case "created": console.log(event.id); break;
    case "deleted": console.log(event.reason); break;
  }
}
```

Useful for payment states, events, and workflow steps.

### Q26. What are `readonly` and `as const`?

They add compile-time restrictions; they do not guarantee runtime deep
immutability.

``` ts
const config = {
  environment: "production",
  retries: 3
} as const;

// config.retries = 4; // Error
```

### Q27. `never` vs `void`?

`void` means a function's return value is not intended to be used.
`never` represents a value that cannot occur, such as a function that
always throws.

``` ts
function logMessage(message: string): void {
  console.log(message);
}

function fail(message: string): never {
  throw new Error(message);
}
```

### Q28. What are `keyof` and indexed access types?

``` ts
interface Settings { theme: string; retries: number }

type SettingKey = keyof Settings; // "theme" | "retries"
type ThemeType = Settings["theme"]; // string
```

`keyof` returns the key union; `T[K]` gives the type of a property.

### Q29. What is strict mode?

The `strict` compiler option enables stronger checks, including
important checks around nullability and implicit `any`.

``` json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  }
}
```

Enable it for new projects where practical; migrate legacy projects
incrementally.

### Q30. How do you type an Express request body?

The request generic helps at compile time, but runtime validation is
still required.

``` ts
import type { Request, Response } from "express";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginInput = z.infer<typeof LoginSchema>;

async function login(req: Request<{}, {}, LoginInput>, res: Response) {
  const parsed = LoginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  return res.json({ accepted: true });
}
```

The request generic does not prove that the client sent valid data. Use
`parsed.data` after successful validation.

## 11. Common mistakes interviewers look for

1.  Claiming `interface` is always better than `type`.
2.  Using `any` to silence type errors.
3.  Assuming TypeScript validates JSON or SQS messages at runtime.
4.  Assuming `as SomeType` converts or validates data.
5.  Using `Partial<Entity>` without considering immutable/sensitive
    fields.
6.  Trusting SQS body content without parsing and validation.
7.  Forgetting retries, duplicate delivery, and idempotency.
8.  Returning internal stack traces to clients.
9.  Treating type safety as a replacement for business rules or database
    constraints.
10. Using a Lambda event type that does not match the configured payload
    version.

## 12. Rapid revision sheet

  -----------------------------------------------------------------------
  Topic                               One-line answer
  ----------------------------------- -----------------------------------
  `interface` vs `type`               Both model shapes; interfaces
                                      support declaration merging, while
                                      type aliases also model unions,
                                      primitives, and tuples.

  Generics                            Reuse logic while preserving
                                      input/output relationships.

  `Partial<T>`                        Make all properties optional.

  `Pick<T, K>`                        Keep selected properties.

  `Omit<T, K>`                        Remove selected properties.

  `Record<K, V>`                      Map keys to a value type.

  `any` vs `unknown`                  Any bypasses checks; unknown
                                      requires narrowing.

  Runtime validation                  Use Zod, Joi, or explicit checks
                                      for untrusted data.

  Lambda event types                  Match the type to the trigger and
                                      payload version.

  SQS messages                        Parse and validate each body;
                                      handle retries and partial
                                      failures.

  Type assertion                      Compile-time instruction, not
                                      runtime validation.

  Discriminated union                 A tagged union enables safe
                                      narrowing.

  `never`                             An impossible value or a function
                                      that never returns normally.

  Strict mode                         Stronger checks catch more bugs
                                      before runtime.
  -----------------------------------------------------------------------

## 13. Self-test checklist

-   [ ] Explain interface vs type and declaration merging.
-   [ ] Write a generic API response wrapper.
-   [ ] Demonstrate `Partial`, `Pick`, `Omit`, and `Record`.
-   [ ] Explain why `unknown` is safer than `any`.
-   [ ] Show why `as` does not validate JSON.
-   [ ] Validate an Express request with Zod.
-   [ ] Type an API Gateway Lambda handler.
-   [ ] Explain REST proxy vs HTTP API v2 event types.
-   [ ] Type an SQS handler and validate each record.
-   [ ] Explain partial batch failures and idempotency.
-   [ ] Model payment statuses with a union.
-   [ ] Model an API result with a discriminated union.
-   [ ] Explain `keyof`, indexed access, and `never`.
-   [ ] Explain how strict mode improves quality.

## Long-term memory framework

For each question, answer in this order:

**Definition → tiny code example → real project use → trade-off or
pitfall.**

At runtime boundaries, remember:

**Receive as unknown → parse → validate → use typed data → handle
failure safely.**
