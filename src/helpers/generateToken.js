import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

export default generateToken;
