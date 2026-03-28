# interview

# Micro Services

- Microservices architecture is a system design where **applications are built as small, independent, loosely coupled services.**
- Each service focuses on a single business function, has its own database, can be deployed and scaled independently, communicates via APIs or events, and provides better scalability, resilience, and faster development.

# Micro services features

1️⃣ Independent & Loosely Coupled Services

Each microservice works independently and communicates using APIs or events, not direct code calls.

👉 Interview line:

Microservices are loosely coupled and independently deployable services.

2️⃣ Single Responsibility Principle

Each service handles one business capability only.

✔ User Service → user data
✔ Payment Service → payment logic

👉 Why important?

Easy maintenance

Clear ownership

3️⃣ Independent Deployment

Each service can be deployed without affecting others.

👉 Example:
Bug fix in Payment Service → deploy only Payment Service

👉 Interview line:

Independent deployment reduces risk and speeds up releases.

4️⃣ Own Database per Service

Each microservice has its own database.

✔ Better data isolation
✔ No tight coupling
❌ No shared DB

👉 Interview line:

Database-per-service improves scalability and data ownership.

5️⃣ Scalability

Services can be scaled independently based on load.

👉 Example:
High traffic on Orders → scale Order Service only

👉 Interview line:

Microservices support horizontal and selective scaling.

6️⃣ Technology Independence (Polyglot)

Different services can use different languages or frameworks.

👉 Example:

Node.js → API

Java → Payment

Python → ML

👉 Interview line:

Microservices support polyglot programming.

7️⃣ Fault Isolation

Failure in one service does not crash the entire system.

👉 Example:
Payment service down → user login still works

👉 Interview line:

Microservices provide fault isolation and system resilience.

8️⃣ Resilience & Failure Handling

Built with:

Retry

Timeout

Circuit Breaker

👉 Why?
To handle partial failures gracefully.

9️⃣ API-Based Communication

Services communicate using:

REST

gRPC

Messaging (Kafka, RabbitMQ)

👉 Interview line:

Microservices communicate using lightweight APIs or events.

🔟 Event-Driven Architecture

Services react to events instead of direct calls.

👉 Example:
Order Created → Payment + Inventory triggered

👉 Benefit:

Loose coupling

High scalability

1️⃣1️⃣ Service Discovery

Services find each other dynamically, not via hard-coded IPs.

👉 Tools:

Kubernetes DNS

Consul

1️⃣2️⃣ API Gateway

A single entry point for all clients.

Handles:

Routing

Authentication

Rate limiting

👉 Interview line:

API Gateway simplifies client-service interaction.

1️⃣3️⃣ CI/CD Friendly

Microservices work well with:

Docker

Kubernetes

CI/CD pipelines

👉 Benefit:
Fast and frequent deployments.

1️⃣4️⃣ Observability & Monitoring

Supports:

Centralized logging

Metrics

Distributed tracing

👉 Tools:

Prometheus

Grafana

ELK

Jaeger

1️⃣5️⃣ Easy Maintenance & Faster Development

Small codebases mean:

Faster development

Easier debugging

Quick onboarding
