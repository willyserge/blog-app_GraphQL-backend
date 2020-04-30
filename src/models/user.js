import mongoose ,{ Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: String,
});

const User = mongoose.model("User", userSchema);
export default User;
