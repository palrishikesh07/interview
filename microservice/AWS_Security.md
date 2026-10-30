# AWS Security Interview Guide

## IAM, Cognito, Secrets Manager, SSM, KMS, S3, WAF, and OWASP

Senior-level interview preparation for Node.js, TypeScript, and AWS,
with simple explanations, implementation examples, and production
scenarios.

--------------------------------------------x----------------------------

## 1. Least-privilege IAM for Lambda

**Easy answer:** Give each Lambda function only the permissions it
needs, only for the resources it needs, and only for the actions it
needs.

For example, a Lambda that reads one S3 bucket should not receive `s3:*`
on every bucket in the account.

### Good IAM practices

-   Use a separate execution role for each function or tightly related
    function group.
-   Restrict actions to required APIs, such as `s3:GetObject`, rather
    than broad wildcards.
-   Restrict resources to specific bucket, table, queue, secret, or key
    ARNs.
-   Add conditions where useful, such as source account, encryption
    context, or resource tags.
-   Avoid long-lived IAM user access keys in application code.
-   Review CloudTrail and IAM Access Analyzer findings; test policies
    before production.
-   Use permission boundaries, organization SCPs, and deployment
    controls where appropriate.

### Execution role vs resource-based policy

  ------------------------------------------------------------------------
  Concept                 What it controls        Example
  ----------------------- ----------------------- ------------------------
  Lambda execution role   What the function's     Allow `sqs:SendMessage`
  (identity-based policy) code can do when it     to one queue
                          calls AWS services      

  Resource-based policy   Who or what can access  SQS queue policy allows
                          a specific resource     a particular SNS topic
                                                  to send messages

  Trust policy on role    Which principal can     `lambda.amazonaws.com`
                          assume the role         can assume a Lambda
                                                  execution role
  ------------------------------------------------------------------------

A Lambda execution role usually needs a trust policy allowing the Lambda
service to assume it, plus permissions for logs and required application
resources.

**Important:** A role permission does not automatically grant another
service permission to invoke the Lambda. Invocation permissions may
require a Lambda resource-based policy, depending on the caller.

### Example: narrow S3 access policy

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadSpecificReports",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::company-private-reports/monthly/*"
    }
  ]
}
```

This grants object reads only under the specified prefix, not bucket
administration or writes.

### Scenario: Lambda sends a message to SQS

Give its execution role `sqs:SendMessage` on the exact queue ARN. If the
queue uses a customer-managed KMS key, also ensure the key policy and
IAM permissions allow the required KMS use. If a queue policy restricts
senders, it must also allow the intended principal.

**Interview line:** "I separate the Lambda execution role from
resource-based policies, scope actions and resources narrowly, and
verify cross-service and KMS permissions end to end."

------------------------------------------------------------------------

## 2. Cognito User Pools vs Identity Pools

```js
  -----------------------------------------------------------------------
  Feature                 User Pool               Identity Pool
  ----------------------- ----------------------- -----------------------
  Main purpose            Authenticate users      Provide AWS credentials
                                                  for authorized access
                                                  to AWS resources

  Manages user directory  Yes                     No, not as its primary
                                                  role

  Common function         Sign-up, sign-in, MFA,  Exchange supported
                          password reset          identity tokens for
                                                  temporary AWS
                                                  credentials

  Output                  Tokens such as ID,      Temporary AWS
                          access, and refresh     credentials through AWS
                          tokens                  STS

  Typical use             Web/mobile login        Client needs direct,
                                                  controlled access to S3
                                                  or other AWS services
  -----------------------------------------------------------------------
```

**Easy memory trick:** User Pool = "Who are you?" Identity Pool = "What
AWS resources may you access?"

They can be used together, but they solve different problems. A typical
web app can use a User Pool for login and keep AWS service access on the
backend rather than exposing direct cloud permissions to the browser.

------------------------------------------------------------------------

## 3. Cognito JWTs: ID vs access vs refresh token

### Token purposes
```js
  -----------------------------------------------------------------------
  Token                   Purpose                 Typical consumer
  ----------------------- ----------------------- -----------------------
  ID token                Identity claims about   Client UI, profile
                          the authenticated user  display, identity
                                                  context

  Access token            Authorization           API or resource server
                          scopes/permissions for  
                          protected APIs          

  Refresh token           Obtain new tokens       Authentication client /
                          without asking the user Cognito token endpoint
                          to sign in again,       
                          subject to session and  
                          policy                  
  -----------------------------------------------------------------------
```
Do not use an ID token as a substitute for an access token when
authorizing API operations. API authorization should use the access
token and enforce required scopes/claims.

### Typical authentication flow

1.  User signs in through the configured Cognito flow.
2.  Cognito issues tokens after successful authentication.
3.  Client sends the access token in `Authorization: Bearer <token>`.
4.  API validates signature and claims.
5.  API checks required scopes/roles and authorizes the operation.
6.  Refresh token is used through the configured Cognito flow to obtain
    new tokens when appropriate.

Tokens are bearer credentials: anyone who steals one may be able to use
it until it expires or is otherwise invalidated. Use HTTPS and protect
storage.

### How to validate a JWT correctly

A JWT is not valid just because it can be Base64-decoded. Verify the
signature and claims.

For Cognito, validate: - Signature against the user pool's published
JWKS public keys. - Expected issuer (`iss`) for the correct user pool. -
Expiration (`exp`) and not-before (`nbf`) where present. - Expected
token use (`token_use`), such as `access` for API authorization. -
Expected app client (`client_id` for access tokens; `aud` is relevant
for ID tokens). - Required scopes, groups, or application authorization
claims.

Use a maintained JWT/Cognito verification library or an API Gateway
Cognito/JWT authorizer where it fits. Cache JWKS keys appropriately and
support key rotation. Do not trust claims before verifying the
signature.

### Node.js / TypeScript example with `aws-jwt-verify`

Install:

``` bash
npm install aws-jwt-verify
```

Verify an access token:

``` ts
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: "access",
  clientId: process.env.COGNITO_APP_CLIENT_ID!
});

export async function verifyAccessToken(token: string) {
  const payload = await verifier.verify(token);

  // Check required scope or application permissions separately.
  return payload;
}
```

In a real API, extract the bearer token carefully, handle verification
errors as unauthorized, and then enforce route-specific authorization. A
valid token does not automatically mean the user may access every
record.

**Authorization example:** Even if a token is valid, a user should not
be able to fetch another customer's invoice merely by changing
`customerId` in the URL. Check resource ownership/permissions
server-side.

------------------------------------------------------------------------

## 4. Secrets Manager vs SSM Parameter Store
```js
  -----------------------------------------------------------------------
  Capability              AWS Secrets Manager     Systems Manager
                                                  Parameter Store
  ----------------------- ----------------------- -----------------------
  Main purpose            Secrets lifecycle       Configuration and
                          management              parameter storage

  Typical data            DB passwords, API       App settings, feature
                          credentials,            flags, configuration;
                          third-party secrets     SecureString for
                                                  sensitive values

  Rotation                Built-in rotation       Rotation generally
                          workflows/integration   requires custom
                          patterns                automation/workflows

  Versioning              Yes                     Yes

  Encryption              KMS integration         SecureString uses KMS

  Cost                    Generally higher;       Standard parameters
                          priced for secret       have a free tier/low
                          storage and API calls   cost; advanced
                                                  parameters and API
                                                  usage may incur charges

  Best fit                Secrets requiring       General configuration
                          rotation and lifecycle  and simpler parameter
                          management              storage
  -----------------------------------------------------------------------
```
Pricing changes, so check current AWS pricing for the region and
parameter tier before making a cost-sensitive decision.

### Practical choice

-   Database credentials requiring managed rotation: usually Secrets
    Manager.
-   Non-sensitive configuration such as `LOG_LEVEL=info`:
    environment/configuration or Parameter Store.
-   Sensitive values with simpler lifecycle and cost priorities:
    Parameter Store `SecureString` may fit, if the team owns rotation
    and operational requirements.
-   Do not store secrets in source control, container images, frontend
    bundles, or plain-text deployment files.

### Fetch and cache secrets outside the Lambda handler

Fetching a secret on every invocation adds latency and API calls.
Initialize the client and cache a secret across warm invocations where
appropriate, with a defined TTL and refresh/error strategy.

``` ts
import {
  SecretsManagerClient,
  GetSecretValueCommand
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({});
let cachedSecret: { value: string; expiresAt: number } | undefined;

export async function getDatabaseSecret(): Promise<string> {
  const now = Date.now();

  if (cachedSecret && cachedSecret.expiresAt > now) {
    return cachedSecret.value;
  }

  const response = await client.send(new GetSecretValueCommand({
    SecretId: process.env.DB_SECRET_ARN!
  }));

  if (!response.SecretString) {
    throw new Error("Database secret is missing SecretString");
  }

  cachedSecret = {
    value: response.SecretString,
    expiresAt: now + 5 * 60 * 1000
  };

  return cachedSecret.value;
}
```

### Caching cautions

-   The module-level cache is per execution environment, not shared
    globally across all Lambda instances.
-   Choose a TTL that balances API cost/latency against rotation
    freshness.
-   Refresh or reconnect when a database credential rotation causes
    authentication failures.
-   Do not log secret values or include them in error messages.
-   Use the AWS Parameters and Secrets Lambda Extension or a supported
    caching library if it fits the runtime and deployment model.
-   If the secret is JSON, parse it and validate required fields rather
    than trusting its shape.

**Interview line:** "I retrieve secrets at runtime using the function's
least-privilege role, cache them outside the handler with a bounded TTL,
and plan refresh/reconnection around rotation."

------------------------------------------------------------------------

## 5. Encryption: at rest and in transit

### Encryption in transit

Protects data while it moves between clients and services, typically
with TLS/HTTPS.

Examples: - Browser → API Gateway over HTTPS. - Lambda → database using
TLS where supported and correctly configured. - Service → service calls
over TLS.

### Encryption at rest

Protects stored data on disk or in managed storage, commonly through AWS
service encryption integrated with KMS.

Examples: - S3 server-side encryption. - Encrypted EBS volumes. -
Encrypted RDS/Aurora storage and snapshots. - DynamoDB encryption at
rest.

Encryption does not replace access control. If a principal is authorized
to read decrypted data, encryption at rest alone does not prevent that
access.

### AWS KMS basics

-   **AWS-managed keys:** managed by AWS for supported service
    encryption defaults/options.
-   **Customer-managed KMS keys:** more control over key policy, grants,
    rotation settings, and audit.
-   **Key policy and IAM:** both can affect whether a principal can use
    a key.
-   **Envelope encryption:** data is encrypted with a data key; KMS
    protects or encrypts the data key.
-   **Rotation:** key rotation changes key material according to
    supported configuration; it does not automatically rotate a database
    password or every application secret.

Do not grant broad `kms:*` permissions. Grant only the operations
required by the workload and ensure the key policy supports the intended
use.

### Scenario: S3 object encrypted with a customer-managed key

The application may need S3 object permissions plus the appropriate KMS
permissions. The KMS key policy must also allow the operation. A correct
S3 policy alone may not be enough.

------------------------------------------------------------------------

## 6. S3 bucket policies and blocking public access

### Secure S3 baseline

1.  Enable all S3 Block Public Access settings unless public hosting is
    explicitly required and reviewed.
2.  Disable ACL-based public access where appropriate; prefer
    bucket-owner-enforced object ownership for many modern designs.
3.  Use least-privilege bucket policies and role permissions.
4.  Require TLS with a policy condition that denies insecure transport.
5.  Use encryption at rest and carefully scope KMS key permissions.
6.  Enable CloudTrail data events or suitable access logging where
    needed.
7.  Use versioning and lifecycle rules where appropriate.
8.  Prefer presigned URLs for time-limited object access rather than
    making a bucket public.

### Example: deny non-TLS requests

``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyInsecureTransport",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::company-private-reports",
        "arn:aws:s3:::company-private-reports/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

Test policies carefully before rollout to avoid unintended access
disruption. Explicit denies take precedence over allows.

**Interview line:** "I keep Block Public Access enabled, use
least-privilege access policies and presigned URLs, require TLS, and
validate both S3 and KMS permissions."

------------------------------------------------------------------------

## 7. API protection: WAF, throttling, validation, and authorization

### AWS WAF

AWS WAF can protect supported front doors such as CloudFront and API
Gateway with rules for: - Common web exploit patterns. - IP allow/block
lists and rate-based rules. - Managed rule groups. - Custom conditions
and request inspection.

WAF is a layer of defense, not a replacement for application
authorization, validation, or secure coding. Choose managed rules
carefully and monitor false positives.

### Throttling and rate limiting

Use multiple layers where appropriate: - API Gateway stage/route
throttling and account quotas. - Usage plans/API keys for usage
identification and metering where applicable---not as a strong
authentication mechanism. - WAF rate-based rules for request patterns
such as abusive IPs. - Application-level limits for per-user or
per-business-operation quotas. - Concurrency limits and queues to
protect downstream systems.

A `429 Too Many Requests` response is commonly used when a client
exceeds a rate limit. Throttling is often best-effort rather than a
perfectly exact global counter.

### Input validation

-   Validate shape, types, ranges, lengths, enums, and required fields
    at the API boundary.
-   Reject unexpected fields where the contract requires strict schemas.
-   Use parameterized SQL queries or safe ORM APIs.
-   Avoid building shell commands from user input.
-   Validate file type and size; do not trust filename extensions alone.
-   Apply business rules and authorization checks after structural
    validation.

Example using Zod:

``` ts
import { z } from "zod";

const CreateOrderSchema = z.object({
  productId: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(20)
}).strict();

export function parseCreateOrder(body: unknown) {
  return CreateOrderSchema.parse(body);
}
```

Catch schema errors and return a controlled `400 Bad Request` response
without leaking internal details.

### Authentication vs authorization

-   **Authentication:** proves who the caller is.
-   **Authorization:** decides what the caller can do.
-   **Validation:** decides whether input has an acceptable shape and
    value.

A valid JWT is not enough by itself: enforce permissions and resource
ownership on every protected operation.

------------------------------------------------------------------------

## 8. OWASP Top 10: how to discuss it in an interview

The OWASP Top 10 is an awareness document for major web application
security risks. The exact categories and wording can change between
editions; use the current edition when preparing for a specific
interview. Common themes include:
```js
  -----------------------------------------------------------------------
  Risk theme                          Practical mitigation
  ----------------------------------- -----------------------------------
  Broken access control               Deny by default; verify ownership
                                      and permissions server-side

  Security misconfiguration           Secure defaults, remove unused
                                      endpoints, review CORS, harden
                                      cloud policies

  Software supply-chain failures /    Pin and update dependencies, scan
  vulnerable components               packages and images, protect CI/CD

  Cryptographic failures              Use TLS, managed encryption, sound
                                      key management, avoid custom crypto

  Injection                           Parameterized queries, safe APIs,
                                      schema validation, context-aware
                                      output handling

  Insecure design                     Threat modeling, abuse cases, rate
                                      limits, secure workflows

  Authentication failures             Strong session/token handling, MFA
                                      where appropriate, secure recovery
                                      flows

  Integrity failures                  Verify trusted artifacts, protect
                                      deployment pipelines, validate
                                      serialized data

  Logging and alerting failures       Audit important actions, alert on
                                      suspicious behavior, never log
                                      secrets

  Exception/error handling issues     Return safe errors; do not leak
                                      stack traces, credentials, or
                                      internal details
  -----------------------------------------------------------------------
```
Treat this as a practical checklist, not a claim that every label
exactly matches every OWASP edition.

### High-value Node.js API controls

-   Use a maintained authentication library and verify tokens correctly.
-   Validate all untrusted input.
-   Parameterize database queries.
-   Set secure HTTP headers where appropriate.
-   Configure CORS for trusted origins; CORS is not authentication.
-   Limit body size and upload size.
-   Apply rate limiting and abuse detection.
-   Keep dependencies patched and scan for known vulnerabilities.
-   Avoid logging passwords, access tokens, session IDs, or secrets.
-   Use centralized error handling and safe production responses.
-   Test authorization boundaries, including cross-tenant access.
-   Use TLS and secure cookie settings where cookie sessions are used.

------------------------------------------------------------------------

## 9. Common security mistakes

1.  Using `Action: "*"` and `Resource: "*"` for convenience.
2.  Treating an API key as user authentication.
3.  Decoding a JWT without verifying its signature and claims.
4.  Accepting an ID token where the API expects an access token.
5.  Putting secrets in frontend environment variables or source control.
6.  Fetching secrets on every invocation without considering
    latency/cost---or caching forever without a rotation strategy.
7.  Assuming encryption at rest replaces IAM authorization.
8.  Making an S3 bucket public when a presigned URL would suffice.
9.  Trusting client-supplied tenant IDs or object IDs without ownership
    checks.
10. Returning raw stack traces or secret-bearing errors to clients.
11. Assuming WAF alone prevents application vulnerabilities.
12. Treating CORS as an access-control mechanism for APIs.
13. Ignoring KMS key policies when debugging encrypted resource access.
14. Logging complete JWTs, passwords, or request bodies that contain
    personal or financial data.

------------------------------------------------------------------------

## 10. Real-world scenario answers

### Scenario A: Lambda can read every secret in the account

**Answer:** Replace broad permissions with
`secretsmanager:GetSecretValue` scoped to the exact secret ARN. If using
a customer-managed KMS key, scope required KMS permissions and verify
the key policy.

### Scenario B: Cognito login works, but API returns 401

**Answer:** Check issuer/user pool, token expiration, token use, client
ID, signature/JWKS, and whether the API expects an access token rather
than an ID token. Check clocks and authorizer configuration. Do not log
the full token.

### Scenario C: A rotated database password breaks warm Lambda instances

**Answer:** Use a bounded secret cache, handle authentication failure
safely, refresh the secret, and recreate the connection pool as needed.
Avoid retry loops that repeatedly hammer the database.

### Scenario D: Private S3 files must be shared for ten minutes

**Answer:** Keep Block Public Access enabled and generate a presigned
URL with a short expiry, while ensuring the signer has only the required
object permissions. Consider whether the URL can be forwarded and
whether access logging is needed.

### Scenario E: An API is being flooded with requests

**Answer:** Apply WAF rate-based rules and managed rules where suitable,
API Gateway throttling, application/user quotas, and monitoring. Use
queues or concurrency limits to protect expensive downstream operations.

### Scenario F: User changes `/customers/123/invoices/456` to another customer's ID

**Answer:** Authenticate the caller, then enforce tenant/resource
ownership server-side for every request. Do not trust IDs supplied by
the client. Add tests for horizontal privilege escalation.

### Scenario G: S3 returns AccessDenied despite an allow policy

**Answer:** Check explicit denies, identity policy, bucket policy, Block
Public Access, object ownership/ACL behavior, VPC endpoint policy,
organization SCPs, and KMS key policy/permissions if the object uses
SSE-KMS.

### Scenario H: Secret API calls are expensive and add latency

**Answer:** Cache the secret outside the Lambda handler with a bounded
TTL or use the Parameters and Secrets Lambda Extension. Balance
performance against rotation freshness and define refresh behavior.

------------------------------------------------------------------------

## 11. Quick interview questions

**Q1. What is least privilege?**\
Grant only the minimum actions and resources required, for the minimum
necessary scope.

**Q2. Execution role vs resource policy?**\
The execution role controls what Lambda code can call; a resource policy
controls who can access a resource or invoke a service, depending on the
resource.

**Q3. User Pool vs Identity Pool?**\
User Pool authenticates users and issues tokens; Identity Pool provides
temporary AWS credentials for supported identities.

**Q4. ID token vs access token?**\
ID token carries identity claims; access token is used for API
authorization and scopes.

**Q5. How do you validate a Cognito JWT?**\
Verify signature using JWKS, issuer, expiration, token use, expected
client/audience, and required authorization claims.

**Q6. Secrets Manager vs Parameter Store?**\
Secrets Manager is purpose-built for secret lifecycle and rotation;
Parameter Store is useful for configuration and can store encrypted
SecureString values.

**Q7. Why cache secrets?**\
Reduce latency and API calls, while keeping a bounded TTL and handling
rotation safely.

**Q8. Encryption at rest vs in transit?**\
At rest protects stored data; in transit protects data moving between
endpoints, usually using TLS.

**Q9. What does KMS do?**\
Manages cryptographic keys and key operations used by AWS services and
applications; permissions and key policies govern use.

**Q10. How do you secure S3?**\
Block public access, least-privilege policies, TLS enforcement,
encryption, controlled object access, and logging/monitoring.

**Q11. Is an API key authentication?**\
Not for user identity. Treat API keys mainly as usage
identification/metering unless a specific design says otherwise; use
proper auth for protected user operations.

**Q12. Does WAF replace input validation?**\
No. WAF is a perimeter layer; the application must validate input and
enforce authorization.

**Q13. What is broken access control?**\
A user can perform an action or access data outside their permissions,
such as reading another tenant's invoice.

**Q14. What should never be logged?**\
Passwords, secret values, full access/refresh tokens, session
credentials, and sensitive personal/financial data unless a strictly
controlled requirement exists.

------------------------------------------------------------------------

## 12. Final 30-second revision

-   **Least privilege:** narrow actions, resources, and trust
    relationships.
-   **Execution role:** what Lambda can do.
-   **Resource policy:** who can access/invoke a resource.
-   **Cognito User Pool:** user authentication and tokens.
-   **Cognito Identity Pool:** temporary AWS credentials for authorized
    access.
-   **ID token:** identity claims; **access token:** API authorization;
    **refresh token:** obtain new tokens.
-   **JWT validation:** signature + issuer + expiry + token use +
    client/audience + authorization claims.
-   **Secrets Manager:** secret lifecycle and rotation.
-   **Parameter Store:** configuration and SecureString parameters.
-   **Secret caching:** module-level bounded TTL, never log values,
    handle rotation.
-   **KMS:** managed key operations and policy-controlled use.
-   **S3:** Block Public Access, least privilege, TLS, encryption,
    presigned URLs.
-   **API security:** WAF + throttling + input validation +
    authorization + monitoring.
-   **OWASP:** prioritize access control, injection, misconfiguration,
    authentication, vulnerable components, and secure error/logging
    practices.

### Strong system-design answer structure

Explain identity and trust, least-privilege permissions, token
verification, secret retrieval and rotation, encryption/key policies,
input validation, rate limits/WAF, audit logs, and how you test
cross-tenant authorization boundaries.
