import { Signing } from '../../entites/signing/Signing';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';

dotenv.config();

const router = express.Router();

// Create a signing @/api/signing
export const createSigning = async (req: Request, res: Response) => {
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
};

// Get all signings @/api/signing
export const getSignings = async (req: Request, res: Response) => {
  try {
    const signings = await Signing.find();

    if (!signings)
      return res.status(404).json({ error: 'There are no signings' });

    res.json(signings);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a signing @/api/signing/:id
export const updateSigning = async (req: Request, res: Response) => {
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
};

// Delete a signing @/api/signing/:id
export const deleteSigning = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const signing = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    await Signing.delete(id);

    res.json(signing);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export default router;
