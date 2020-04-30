import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from 'apollo-server'
import User from "../../models/user";
import { JWT_SECRET } from "../../../config";

const usersResolver = {
  Mutation: {
    async register(
      _,
      { registerInput: { name, email, password, confirmPassword } },
    ) {
      const user = await User.findOne({email});
      if (user) {
          throw new UserInputError('email is taken',{
              errors:{
                  email:'email is taken'
              }
          })
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          name: res.name,
          email: res.email,
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default usersResolver;
