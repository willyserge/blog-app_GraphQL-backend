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
  type Query {
    _: String
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email:String!,password:String!): User!
  }
`;
export default typeDefs;
