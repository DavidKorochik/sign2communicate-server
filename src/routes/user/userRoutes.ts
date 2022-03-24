import express, { IRouter } from 'express';
import auth from '../../middleware/auth';
import {
  createUser,
  getUsers,
  deleteUser,
} from '../../controllers/user/userController';

const router: IRouter = express.Router();

// Create a user @/api/user
router.post('/', createUser);

// Get all users @/api/user
router.get('/', getUsers);

// Delete a user @/api/user/:id
router.delete('/:id', auth, deleteUser);

export default router;
