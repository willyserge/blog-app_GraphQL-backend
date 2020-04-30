import bcrypt from "bcryptjs";
import { UserInputError, addErrorLoggingToSchema } from "apollo-server";
import User from "../../models/user";
import Validate from "../../helpers/validator";
import generateToken from "../../helpers/generateToken";

const usersResolver = {
  Mutation: {
    async register(
      _,
      { registerInput: { name, email, password, confirmPassword } }
    ) {
      const { error } = Validate.register({
        name,
        email,
        password,
        confirmPassword,
      });
      if (error) {
        throw new UserInputError("Errors", {
          errors: error.message.replace(/"/g, ""),
        });
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("email is taken", {
          errors: {
            email: "email is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken();

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { email, password }) {
      const { error } = Validate.login({ email, password });
      if (error) {
        throw new UserInputError("Errors", {
          errors: error.message.replace(/"/g, ""),
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("Errors", {
          errors: "Wrong email or password",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Errors", {
          errors: "Wrong email or password",
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export default usersResolver;
