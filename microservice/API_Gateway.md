# Amazon API Gateway Interview Guide

## Easy explanations, senior-level answers, code, and production scenarios

**Study formula:** API type → required feature → security → limits →
failure/monitoring → cost trade-off. Verify current AWS feature
availability, quotas, and pricing before production decisions.

## 1. What is API Gateway?

Amazon API Gateway is a managed API front door for routing, securing,
throttling, monitoring, and integrating HTTP/WebSocket requests with
Lambda, AWS services, or HTTP backends.

**Scenario:** A React app calls `POST /orders`; API Gateway
authenticates and throttles the request, then invokes Lambda.

**Interview answer:** "I use API Gateway for routing, authorization,
throttling, request/response handling, and monitoring, choosing the API
type based on features, traffic, and cost."

## 2. REST API vs HTTP API vs WebSocket API

### Q1. Explain the difference

  --------------------------------------------------------------------------------------------
  Feature                 REST API                    HTTP API           WebSocket API
  ----------------------- --------------------------- ------------------ ---------------------
  Main use                Feature-rich REST endpoints Standard HTTP      Persistent two-way
                                                      endpoints          messaging

  Cost                    Generally higher than HTTP  Generally lower    Message and
                          API                                            connection-duration
                                                                         pricing model

  Overhead                More features/configuration Designed for lower Maintains connections
                                                      overhead           

  Auth options            IAM, Cognito, Lambda        JWT, IAM, Lambda   Connect-time and
                          authorizers                 authorizers (check route authorization
                          (configuration-dependent)   support)           patterns

  Validation/transforms   Richer built-in validation  More limited       Usually
                          and mapping                 built-in request   application-level
                                                      validation         message validation

  Usage plans/API keys    Supported                   Not equivalent to  Not the normal HTTP
                                                      full REST          usage-plan model
                                                      usage-plan         
                                                      features           

  API response cache      Supported in applicable     No equivalent REST Application-managed
                          REST configurations         API cache feature  

  Best fit                Advanced gateway features   Lower-cost,        Chat, live updates,
                          required                    standard           collaborative apps
                                                      request/response   
  --------------------------------------------------------------------------------------------

**Choose REST API** if a required feature such as applicable usage plans
or API caching matters. **Choose HTTP API** for standard HTTP routing
with lower overhead/cost. **Choose WebSocket API** for persistent
bidirectional communication. Check current AWS docs for exact feature
support.

**Interview answer:** "I choose based on capabilities rather than name
alone: REST for advanced gateway features, HTTP for common low-overhead
APIs, and WebSocket for real-time two-way messaging."

## 3. Authorizers

### Q2. What is an authorizer?

An authorizer decides whether a request may access an API route.
Authentication asks "Who are you?"; authorization asks "What may you
access?"

### Q3. Cognito vs JWT vs Lambda authorizer vs IAM

  -----------------------------------------------------------------------
  Method                  How it works            Best fit
  ----------------------- ----------------------- -----------------------
  Cognito user-pool       Validates supported     User sign-in and app
  authorizer              Cognito-issued tokens   APIs
                          and configured scopes   

  JWT authorizer          Validates JWT claims    OAuth/OIDC access
                          such as issuer,         tokens, commonly HTTP
                          audience, expiry, and   APIs
                          scopes                  

  Lambda authorizer       Invokes custom code to  Tenant-specific rules,
                          make an authorization   legacy/custom tokens
                          decision                

  IAM auth                SigV4-signed request    AWS workloads and
                          evaluated against IAM   trusted
                          policies                service-to-service
                                                  calls
  -----------------------------------------------------------------------

Feature availability depends on API type and configuration. A valid
token does not automatically authorize access to every resource.

### Q4. How does a Lambda authorizer work?

1.  Client sends an identity token.
2.  API Gateway invokes the authorizer unless a cached result can be
    used.
3.  Authorizer validates identity and permissions.
4.  It returns the response format required by the configured authorizer
    type.
5.  Gateway allows or denies the integration request.

Conceptual REST API authorizer example:

``` ts
export const handler = async (event: any) => {
  const identity = await verifyToken(event.authorizationToken);

  return {
    principalId: identity.userId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [{
        Action: "execute-api:Invoke",
        Effect: identity.allowed ? "Allow" : "Deny",
        Resource: event.methodArn
      }]
    },
    context: { tenantId: identity.tenantId }
  };
};
```

This is illustrative, not a complete secure implementation. Real REST
and HTTP API authorizer event/response types differ. Validate signature,
issuer, audience, expiry, and claims using a trusted library; don't
write cryptographic verification casually.

### Q5. What is authorizer caching, and what can go wrong?

Gateway can cache an authorization decision for a configured TTL,
reducing authorizer calls, latency, and cost. A poorly designed cache
key or policy can reuse a decision for a different route, user, or
tenant. Permission revocation may also take effect only after expiry.

**Best practices:** Include all relevant identity inputs in the cache
key, keep TTL short when permissions change frequently, design policies
to match the cached scope, and test across users/routes/tenants.

**Scenario:** A policy depends on tenant ID in the URL but caching keys
only on a shared token. One tenant's authorization could be reused for
another tenant. Correct the cache-key/policy design and add cross-tenant
regression tests.

## 4. Throttling, usage plans, API keys

### Q6. What is throttling?

Throttling limits request rate and bursts to help protect the
API/backend. API Gateway uses token-bucket-style controls in many
configurations, but limits can be best-effort and other account, stage,
route, or integration limits may apply.

### Q7. What are usage plans and API keys?

For REST APIs, usage plans can associate API keys with stages and set
per-key throttling and quota settings.

-   **API key:** identifies a caller/app for usage tracking and
    usage-plan enforcement.
-   **Usage plan:** configures applicable rate/burst and quota settings.
-   **Quota:** a usage target over a period, not a security boundary.

**API keys are not authentication by themselves.** Protect private data
with a proper authorizer or IAM policy.

### Q8. How do you protect a backend during a traffic spike?

1.  Configure gateway throttling.
2.  Set Lambda reserved concurrency to protect scarce downstream
    resources.
3.  Put non-urgent work behind SQS to smooth bursts.
4.  Use AWS WAF/rate-based rules where appropriate.
5.  Cache safe, cacheable responses.
6.  Monitor 429s, Lambda throttles, queue age, and database connections.
7.  Clients should retry with exponential backoff and jitter, not a
    tight loop.

**Scenario:** A promotion creates a burst of requests. Gateway
throttling limits incoming pressure, Lambda concurrency protects RDS,
and SQS buffers background order work.

## 5. Request validation and CORS

### Q9. What is request validation?

It checks that requests meet expected requirements before backend work.
Depending on API type, Gateway can validate required parameters or body
schemas; application-level business validation still belongs in the
backend.

Validate JSON syntax/schema, required parameters, business constraints,
content type/size, authentication, and authorization. Gateway validation
does not replace validation when the same Lambda can also be invoked by
SQS or EventBridge.

### Q10. What is CORS?

Cross-Origin Resource Sharing is a browser policy controlling whether
JavaScript from one origin can read responses from another origin.

Example response headers:

``` http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type,Authorization
```

Common mistakes: - Forgetting OPTIONS preflight. - Missing CORS headers
on errors. - Allowing unnecessary origins, methods, or headers. -
Combining credentialed browser requests with wildcard origin. - Assuming
CORS authenticates users. **It does not.**

For credentialed requests, use a specific allowed origin rather than
`*`.

### Q11. How do you secure an API?

Use an appropriate authorizer/IAM, least-privilege resource policies,
backend validation, throttling, WAF where needed, narrow CORS, safe
logs, and downstream concurrency limits. Never put secrets in URLs or
logs.

## 6. Proxy vs non-proxy integration

### Q12. What is Lambda proxy integration?

Gateway passes request details to Lambda in an event object. Lambda
returns a response in the configured proxy format.

``` ts
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const name = event.queryStringParameters?.name ?? "world";

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: `Hello, ${name}` })
  };
};
```

Malformed proxy responses can cause a gateway error such as 502.

### Q13. What is non-proxy integration?

Gateway uses mappings/templates to transform the request sent to the
backend and/or the backend response returned to the client.

  -----------------------------------------------------------------------
  Proxy                               Non-proxy
  ----------------------------------- -----------------------------------
  Passes structured event; backend    Gateway transforms request/response
  owns most response logic            

  Usually simpler for Lambda APIs     Useful for custom mapping or legacy
                                      backends

  Less mapping configuration          More configuration and testing
  -----------------------------------------------------------------------

**Interview answer:** "Proxy is my default for most Lambda APIs because
it is simpler. I use non-proxy when Gateway must transform payloads or
adapt a backend without changing it."

## 7. Payload limits and large uploads

### Q14. What is the API Gateway payload limit?

For common API Gateway REST and HTTP API request/response payloads, **10
MB is a commonly documented maximum**. Verify the current limit for the
API type and integration. Other service limits---such as synchronous
Lambda invocation payload size---may be lower and can become the
effective limit.

### Q15. How do you upload files larger than the limit?

Do not route large file bytes through API Gateway and Lambda. Use a
**presigned S3 URL**.

**Flow:** client requests upload URL → Lambda authenticates and
authorizes → Lambda creates short-lived URL → client uploads directly to
S3 → backend validates object → asynchronous processing starts.

Install SDK packages:

``` bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

Example presigned PUT URL:

``` ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const s3 = new S3Client({});

export const handler = async (event: { contentType?: string }) => {
  const allowedTypes = new Set([
    "image/jpeg",
    "image/png",
    "application/pdf"
  ]);

  const contentType = event.contentType ?? "";
  if (!allowedTypes.has(contentType)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unsupported content type" })
    };
  }

  const key = `uploads/${randomUUID()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.UPLOAD_BUCKET!,
    Key: key,
    ContentType: contentType
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ uploadUrl, key, expiresIn: 300 })
  };
};
```

This illustrates URL generation only. Production must authenticate the
caller, restrict key prefixes, use least-privilege IAM and bucket
policies, apply encryption, and validate the actual uploaded content and
size. The client must send signed headers such as Content-Type if
included in the signature.

For very large files, use S3 multipart upload with presigned URLs for
individual parts. Add cleanup for abandoned multipart uploads.

**Security checklist:** short URL expiry, server-generated keys, no
public bucket, verify actual file content, malware scanning/quarantine
when appropriate, and least-privilege permissions.

## 8. Additional interview questions

### Q16. Authentication vs authorization?

Authentication establishes identity; authorization decides permitted
actions. A valid JWT does not mean a user can read another tenant's
records.

### Q17. How should a client handle HTTP 429?

Respect `Retry-After` when provided, use exponential backoff with
jitter, cap retries, and avoid tight-loop retrying.

### Q18. How do you debug API Gateway 5xx?

Check access/execution logs, request ID, integration latency, Lambda
errors/throttles, malformed proxy response, timeout behavior, and
downstream errors. Do not log tokens or sensitive bodies.

### Q19. API response cache vs authorizer cache?

Response caching stores eligible API responses in supported REST API
configurations. Authorizer caching stores authorization decisions. They
have different keys, TTLs, and security risks. Never cache personalized
responses under a key that does not distinguish users.

### Q20. How do you version an API?

Use a documented strategy such as `/v1` or a versioned header, preserve
backward compatibility, test consumers, and deprecate versions
deliberately.

### Q21. How do you stop one customer overwhelming the API?

Use identity-aware throttling where supported, REST usage plans for
applicable clients, WAF/rate rules, application quotas, and backend
concurrency limits. API keys alone are not secure identity.

## 9. Real-world scenarios

### Scenario A: Need one advanced feature but HTTP API is cheaper

Check whether HTTP API supports the exact requirement. If usage-plan or
caching needs require REST API, compare its cost/complexity with the
benefit.

### Scenario B: Authorizer cache leaks access across tenants

Treat as a critical authorization bug. Review identity sources, cache
key, TTL, policy scope, and tenant context. Disable/reduce caching while
fixing, add cross-tenant tests, and invalidate cached decisions where
possible.

### Scenario C: Browser preflight fails in production

Check deployed CORS settings, OPTIONS handling, allowed
origins/methods/headers, credential rules, and error response headers.
CORS is not authentication.

### Scenario D: A 200 MB video upload fails

Use an authenticated API to issue a presigned S3 URL, upload directly,
and use multipart upload for large files. Validate the object before
processing.

### Scenario E: Traffic spike causes Lambda/RDS throttling

Apply gateway throttling, concurrency caps, RDS connection pooling where
appropriate, SQS for asynchronous work, and bounded backoff. Monitor
429s, throttles, and queue age.

### Scenario F: Gateway returns 502 but Lambda logs success

Verify the configured integration type and response contract. REST
Lambda proxy integration expects `statusCode`, optional headers, and a
string `body`; correlate gateway logs and request IDs.

## 10. Rapid revision

  -----------------------------------------------------------------------
  Topic                               One-line answer
  ----------------------------------- -----------------------------------
  REST API                            Feature-rich gateway when advanced
                                      capabilities are required.

  HTTP API                            Lower-overhead, generally
                                      lower-cost standard HTTP endpoints.

  WebSocket API                       Persistent two-way messaging.

  Cognito/JWT authorizer              Validates supported identity/access
                                      tokens.

  Lambda authorizer                   Custom authorization with
                                      invocation and caching trade-offs.

  IAM auth                            SigV4 request plus IAM policy
                                      evaluation.

  Authorizer caching                  Saves latency/cost but can reuse an
                                      overly broad decision.

  Throttling                          Controls rate/burst to protect
                                      backend capacity.

  API keys                            Usage tracking/plan enforcement,
                                      not authentication by themselves.

  CORS                                Browser cross-origin policy, not
                                      authentication.

  Proxy integration                   Backend receives structured event
                                      and returns expected response.

  Non-proxy integration               Gateway transforms
                                      request/response.

  Large upload                        Presigned S3 URL; multipart upload
                                      for very large files.

  HTTP 429                            Backoff with jitter.

  5xx debugging                       Correlate gateway logs, integration
                                      latency, and backend logs.
  -----------------------------------------------------------------------

## 11. Self-test checklist

-   [ ] REST vs HTTP vs WebSocket API?
-   [ ] Which feature might justify REST over HTTP API?
-   [ ] Cognito vs JWT vs Lambda authorizer vs IAM?
-   [ ] How can authorizer caching cause cross-tenant bugs?
-   [ ] Throttling vs quotas vs usage plans vs API keys?
-   [ ] Why are API keys not authentication?
-   [ ] What does CORS do and not do?
-   [ ] Proxy vs non-proxy integration?
-   [ ] What causes 502 from proxy integration?
-   [ ] How do you upload a file larger than the gateway limit?
-   [ ] Presigned PUT vs multipart upload?
-   [ ] Debug 429 and 5xx responses?

**Long-term memory:** API type → feature → security → limits →
monitoring → cost. For uploads: **Authorize → presigned S3 URL → direct
upload → validate object → process asynchronously.**
