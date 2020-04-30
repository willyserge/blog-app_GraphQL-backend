import usersResolver from "./users";
import postsResolver from "./posts";

const resolvers = {
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
  },
};
export default resolvers;
