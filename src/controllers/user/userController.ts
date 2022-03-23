import jwt from 'jsonwebtoken';
import { User } from '../../entites/user/User';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Create a user @/api/user
router.post('/', async (req: Request, res: Response) => {
  // Getting the data from req.body
  const { name, personal_number, phone_number, military_unit, role } = req.body;

  try {
    // Searching in the database if the user exists, if it exists we return 400 status code
    const userExists = await User.findOne({
      where: { personal_number },
    });

    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    // We create a user based on his personal number, if the user is one of the listed personal numbers it will be automatically set to an admin role, if it is not one of the personal numbers listed it will be set automatically to a client role
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

    // We generate a jwt token for a user
    jwt.sign(
      payload,
      process.env.SECRET_KEY as string,
      { expiresIn: '6 days' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json(token);
      }
    );
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users @/api/user
router.get('/', async (req: Request, res: Response) => {
  try {
    // We get all the users in the database
    const users = await User.find();

    if (!users) return res.status(404).json({ error: 'There are no users' });

    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user @api/user/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Searching in the database if there is a user with the id that was passed as a param
    const user = await User.findOne(id);

    // if there is not a user we return a 404 status code
    if (!user) return res.status(404).json({ error: 'There is no such user' });

    // if there is a user we delete it
    await User.delete(id);

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
