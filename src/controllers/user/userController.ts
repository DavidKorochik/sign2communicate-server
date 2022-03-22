import jwt from 'jsonwebtoken';
import { User } from '../../entites/user/User';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, personal_number, phone_number, military_unit, role } = req.body;

  try {
    const userExists = await User.find(personal_number);

    if (userExists) return res.json({ error: 'User already exists' });

    const user =
      personal_number === '8811382' || personal_number === '8889611'
        ? User.create({
            name,
            personal_number,
            phone_number,
            military_unit,
            role: 'Admin',
          })
        : User.create({
            name,
            personal_number,
            phone_number,
            military_unit,
            role,
          });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    // jwt.sign(payload, process.env.SECRET_KEY as string, (err, token) => {
    //   if (err) throw err;
    //   res.json(token);
    // });

    res.json(user);
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users) return res.json({ error: 'There are no users' });

    res.json(users);
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
  } catch (err: any) {
    res.json({ error: err.message });
  }
});

export default router;