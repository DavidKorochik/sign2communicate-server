import express from 'express';
import auth from '../../middleware/auth';
import {
  logInUser,
  getLoggedInUser,
} from '../../controllers/auth/authController';

const router = express.Router();

// Log in to an existing user @/api/auth
router.post('/', logInUser);

// Get the logged in user @/api/auth
router.get('/', auth, getLoggedInUser);

export default router;
