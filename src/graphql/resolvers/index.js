import usersResolver from "./users";

const resolvers = {
  Mutation: {
    ...usersResolver.Mutation,
  },
};
export default resolvers;
