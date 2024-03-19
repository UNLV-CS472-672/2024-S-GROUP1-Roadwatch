import jwt from 'jsonwebtoken';

export const signToken = (payload: { user_id: number }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1hr',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as {
    user_id: number;
  };
};
