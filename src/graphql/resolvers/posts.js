import Post from "../../models/post";
import checkAuth from "../../middleware/auth";
import { AuthenticationError } from "apollo-server";

const postsResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  async getPost(_, { postId }) {
    try {
      const post = await Post.findById(postId);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        name: user.name,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log(user);
      try {
        const post = await Post.findById(postId);
        if (user.id == post.user) {
          await post.delete();
          return "post deleted successfully";
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { name } = checkAuth(context);
      console.log(name);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.name === name)) {
          post.likes = post.likes.filter((like) => like.name !== name);
        } else {
          post.likes.push({
            name,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};

export default postsResolver;
