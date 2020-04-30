import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      name: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      name: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
