import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../entites/user/User';
import client from '../../db/redis/redis';
import {
  RequestExtendedWithUser,
  IUserPayload,
} from '../../interfaces/user/user';
import dotenv from 'dotenv';

dotenv.config();

// Log in to an existing user @/api/auth
export const logInUser: any = async (req: Request, res: Response) => {
  const { personal_number } = req.body;
  try {
    // Find the user that is trying to log in
    const user = await User.findOne({ where: { personal_number } });

    if (!user) return res.status(404).json({ error: 'משתמש אינו קיים' });

    // Create a payload for the jwt
    const payload: IUserPayload = {
      user: {
        id: user.id,
      },
    };

    // Assign the payload and create a new log in instance
    jwt.sign(
      payload,
      process.env.SECRET_KEY as string,
      {
        expiresIn: '6 days',
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json(token);
      }
    );
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get the logged in user @/api/auth
export const getLoggedInUser: any = async (
  req: RequestExtendedWithUser,
  res: Response
) => {
  try {
    // Find the user that is logged in based on the auth middleware
    const user = await User.findOne(req.user.id);

    if (!user) return res.status(404).json({ error: 'משתמש אינו קיים' });

    // Caching the user that is logged in
    await client.setEx(req.user.id, 3600, JSON.stringify(user));

    // Getting the cached in user that is logged in
    const userCached = await client.get(req.user.id);

    // Checking if the user that is logged in is in the cache we return it, if not we set it to the cache and return the user that is saved in the database
    if (userCached) {
      return res.status(200).json(JSON.parse(userCached));
    } else {
      await client.setEx(req.user.id, 3600, JSON.stringify(user));
      return res.status(200).json(user);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
