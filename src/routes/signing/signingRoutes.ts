import express, { IRouter } from 'express';
import auth from '../../middleware/auth';
import {
  createSigning,
  getSignings,
  updateSigning,
  deleteSigning,
  deleteAllSignings,
} from '../../controllers/signing/signingController';

const router: IRouter = express.Router();

// Create a signing @/api/signing
router.post('/', auth, createSigning);

// Get all signings @/api/signing
router.get('/', auth, getSignings);

// Update a signing @/api/signing/:id
router.put('/:id', auth, updateSigning);

// Delete a signing @/api/signing/:id
router.delete('/:id', auth, deleteSigning);

// Delete all signings @/api/signing
router.delete('/', auth, deleteAllSignings);

export default router;
