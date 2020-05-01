import usersResolver from "./users";
import postsResolver from "./posts";
import commentsResolver from "./comments";

const resolvers = {
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};
export default resolvers;
