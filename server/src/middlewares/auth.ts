import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    const payload = verifyToken(token);
    req.body = {
      user_id: payload.user_id,
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }
};
