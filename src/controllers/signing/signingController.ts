import jwt from 'jsonwebtoken';
import { Signing } from '../../entites/signing/Signing';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';

dotenv.config();

const router = express.Router();

// Create a signing @/api/signing
router.post('/', async (req: Request, res: Response) => {
  const { equipment, signingDate, returningDate, time, description } = req.body;

  try {
    const signing = Signing.create({
      equipment,
      signingDate,
      returningDate,
      time,
      description,
    });

    await signing.save();

    res.status(201).json(signing);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Get all signings @/api/signing
router.get('/', async (req: Request, res: Response) => {
  try {
    const signings = await Signing.find();

    if (!signings)
      return res.status(404).json({ error: 'There are no signings' });

    res.json(signings);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Update a signing @/api/signing/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { equipment, signingDate, returningDate, time, description } = req.body;
  const id = req.params.id;

  try {
    const signing = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    getRepository(Signing).merge(signing, {
      equipment,
      returningDate,
      signingDate,
      time,
      description,
    });

    const signingUpdated = await getRepository(Signing).save(signing);

    res.json(201).json(signingUpdated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete a signing @/api/signing/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const signing = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    await Signing.delete(id);

    res.json(signing);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
