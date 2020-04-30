import Post from "../../models/post";

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
};
export default postsResolver;
