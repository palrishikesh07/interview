
// Query 1
const users = await db.query("SELECT id, name FROM users");

// N Queries
for (const user of users) {
    const posts = await db.query(
        "SELECT * FROM posts WHERE user_id = ?",
        [user.id]
    );

    user.posts = posts;
}


type Book {
  id: ID!
  title: String!
  price: Float
}

type Query {
  getBooks: [Book!]!
}



const resolvers = {
  Query: {
    user: async (_, args, context) => {
      return await context.db.findUserById(args.id);
    },
  },
};


query GetTwoUsers {
  adminUser: user(id: "1") {
    name
  }
  guestUser: user(id: "2") {
    name
  }
}


input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}



const { GraphQLScalarType, Kind } = require('graphql');

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  serialize(value) {
    return value.toISOString(); // Convert outgoing Date to ISO String
  },
  parseValue(value) {
    return new Date(value); // Convert incoming client value to JS Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});


union SearchResult = User | Post

type Query {
  search(text: String!): [SearchResult!]!
}

query Search {
  search(text: "node") {
    __typename
    ... on User {
      name
    }
    ... on Post {
      title
    }
  }
}


interface Node {
  id: ID!
}

type User implements Node {
  id: ID! # Must match Interface
  name: String!
}


type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

type UserEdge {
  cursor: String!
  node: User!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

query GetUser($showEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $showEmail)
  }
}


{
  "data": null,
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"]
    }
  ]
}


const DataLoader = require('dataloader');

// Batch function to fetch posts for multiple user IDs in one query
const batchGetPostsByUserId = async (userIds) => {
  // e.g., SELECT * FROM posts WHERE user_id IN (1, 2, 3...)
  const posts = await Post.find({ userId: { $in: userIds } });
  
  // Return array matching the order of userIds
  return userIds.map(id => posts.filter(p => p.userId === id));
};

const userPostsLoader = new DataLoader(batchGetPostsByUserId);

// Resolver
const resolvers = {
  User: {
    posts: (parent, _, context) => {
      return context.userPostsLoader.load(parent.id); // Batched automatically!
    },
  },
};




const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    postComment: (_, { text }) => {
      const comment = { id: Date.now(), text };
      pubsub.publish('COMMENT_ADDED', { commentAdded: comment });
      return comment;
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(['COMMENT_ADDED'])
    }
  }
};


type User {
  id: ID!
  fullName: String!
  name: String @deprecated(reason: "Use fullName instead")
}


