import Post from "../../models/post";
import checkAuth from "../../middleware/auth";

const postsResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
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
          user:user.id,
          name:user.name,
          createdAt: new Date().toISOString()
      })
      const post = await newPost.save();
      return post;
    },
  },
};
export default postsResolver;
