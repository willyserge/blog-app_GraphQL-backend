import { AuthenticationError } from 'apollo-server';

import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = verify(token, JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

export default checkAuth;