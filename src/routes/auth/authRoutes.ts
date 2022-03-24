import express from 'express';
import auth from '../../middleware/auth';

const router = express.Router();

// Log in to an existing user @/api/auth
router.post('/');

// Get the logged in user @/api/auth
router.get('/', auth);

export default router;
