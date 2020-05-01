import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    name: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    name: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    name: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
export default typeDefs;
