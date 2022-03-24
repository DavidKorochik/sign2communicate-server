import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserPayload } from '../interfaces/user/user';
import dotenv from 'dotenv';

dotenv.config();

interface RequestExtendedWithUser extends Request {
  user: {
    id: string;
    name: string;
    personal_number: string;
    phone_number: string;
    military_unit: string;
    role: string;
  };
}

export default function auth(
  req: RequestExtendedWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.header('auth-token');

    if (!token) return res.status(401).json({ error: 'User not authorized' });

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IUserPayload;

    req.user = decoded.user;

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}
