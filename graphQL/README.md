## GraphQL
- GraphQL is an API <b>query language</b> and runtime that lets a client request exactly the data it needs. 
- It was originally developed at Meta and is now maintained by the GraphQL Foundation.
- The three core operations are:
-  Queries (read data).
-  Mutations (change data).
-  Subscriptions (receive real-time updates).


## Advantages
```js
| Advantage                          | Interview explanation                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **1. Avoids over-fetching**        | Client requests only the fields it needs.                                                                             |
| **2. Avoids under-fetching**       | One query can fetch related data instead of making multiple API calls.                                                |
| **3. Single endpoint**             | Usually APIs use one endpoint such as `/graphql` instead of many REST endpoints.                                      |
| **4. Strongly typed**              | GraphQL uses a schema, so the structure and types of data are clearly defined.                                        |
| **5. Better frontend flexibility** | Frontend developers can decide what data they need without requiring a new backend endpoint for every UI requirement. |
| **6. Self-documenting**            | The schema makes it easy to understand available queries, mutations, types, and fields.                               |
| **7. Great for complex data**      | Useful when data has many relationships, such as users → posts → comments → authors.                                  |
| **8. Versioning is easier**        | Instead of creating `/api/v2`, fields can gradually be deprecated and replaced.                                       |
```

## Disadvantages

```js

| Disadvantage                                      | Interview explanation                                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **1. More complex backend**                       | Backend needs to maintain schemas, resolvers, types, authorization, etc.                              |
| **2. Caching can be harder**                      | REST can easily cache `GET /users/123`; GraphQL often uses POST requests with different query bodies. |
| **3. Query complexity**                           | A client can request deeply nested or expensive data, potentially causing performance problems.       |
| **4. N+1 problem**                                | Poorly implemented resolvers can generate many database queries.                                      |
| **5. File uploads aren't straightforward**        | GraphQL itself doesn't define file uploads as simply as normal REST multipart APIs.                   |
| **6. HTTP status codes are less straightforward** | GraphQL can return HTTP 200 while the response contains application-level errors.                     |
| **7. Learning curve**                             | Developers need to understand schemas, queries, mutations, resolvers, fragments, etc.                 |
| **8. Authorization can become complex**           | Permissions may need to be handled at field/resolver level rather than simply at endpoint level.      |

```
- GraphQL is useful when clients need flexible and complex data; 
- REST can be simpler and more suitable for straightforward APIs."

## What is Apollo Server

- Apollo Server is a Node.js framework/library used to build and run GraphQL APIs, handling queries, mutations, schemas, and resolvers.
- It acts as a layer between the client and backend/data sources, fetching the required data and returning it in the GraphQL response.

### Basic Server Setup
```js
npm install @apollo/server graphql

Schema → Resolver → Apollo Server → Start Server

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// 1. Schema / Type Definitions
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    user: User
  }
`;

// 2. Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello GraphQL",

    user: () => ({
      id: "1",
      name: "Rishikesh",
      email: "rishikesh@example.com"
    })
  }
};

// 3. Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// 4. Start Server
startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server running at ${url}`);
});

🧠 Easy interview memory trick
typeDefs  → What data is available? (int, float, string, boolean, ID(its a unique identifier for an object))
resolvers → Where does the data come from?
Apollo    → Runs the GraphQL server
query     → Client asks for required data
```
- In Apollo Server, I define the GraphQL schema using typeDefs, 
- Implement the business/data-fetching logic in resolvers, 
- Create an ApolloServer instance with both, and then start the server. 
- The client can then send queries or mutations to retrieve or modify the required data."