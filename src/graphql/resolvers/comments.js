import checkAuth from "../../middleware/auth";
import { UserInputError } from "apollo-server";
import Post from "../../models/post";

const commentsResolver = {
  
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { name } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          name,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
  }
};
export default commentsResolver;
