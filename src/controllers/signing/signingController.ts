import { Signing } from '../../entites/signing/Signing';
import express, { Request, Response } from 'express';
import { RequestExtendedWithUser } from '../../interfaces/user/user';
import client from '../../db/redis/redis';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';

dotenv.config();

const router = express.Router();

// Create a signing @/api/signing
export const createSigning: any = async (
  req: RequestExtendedWithUser,
  res: Response
) => {
  const { equipment, signingDate, returningDate, time, description } = req.body;

  try {
    // Creating a signing based on the req.body
    const signing = Signing.create({
      equipment,
      signingDate,
      returningDate,
      time,
      description,
      user: req.user,
    });

    // Caching the new signings that was created
    await client.setEx(signing.id, 3600, JSON.stringify(signing));

    const signingCached = await client.get(signing.id);

    // Saving the signing to the database
    await signing.save();

    // Checking if there is the signing that was created cached, if not return the signing that was created from the database
    if (signingCached) {
      return res.status(201).json(signingCached);
    } else {
      await client.setEx(signing.id, 3600, JSON.stringify(signing));
      return res.status(201).json(signing);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all signings @/api/signing
export const getSignings: any = async (req: Request, res: Response) => {
  try {
    // Finding all of the signings in the database
    const signings = await Signing.find();

    if (!signings)
      return res.status(404).json({ error: 'There are no signings' });

    // Caching the signings
    await client.setEx('signings', 3600, JSON.stringify(signings));

    // Getting the cached signings
    const signingsCached = await client.get('signings');

    // Checking if there are any signings cached, if not return the signings from the database
    if (signingsCached) {
      return res.status(200).json(JSON.parse(signingsCached));
    } else {
      await client.setEx('signings', 3600, JSON.stringify(signings));
      return res.status(200).json(signings);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a signing @/api/signing/:id
export const updateSigning: any = async (req: Request, res: Response) => {
  const { equipment, signingDate, returningDate, time, description } = req.body;
  const id = req.params.id;

  try {
    // Finiding one signing with the id that is passed
    const signing = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    // Merging the changes that were made from the req.body to the signing that we have found
    getRepository(Signing).merge(signing, {
      equipment,
      returningDate,
      signingDate,
      time,
      description,
    });

    // Saving the new updated signing
    const signingUpdated: any = await getRepository(Signing).save(signing);

    res.json(201).json(signingUpdated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a signing @/api/signing/:id
export const deleteSigning: any = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Searching for the signing that we wish to delete
    const signing = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    // Deleting the signing based on the id that was passed
    await Signing.delete(id);

    // Deleting the signing from the cache
    await client.del(req.params.id);

    res.json(signing);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export default router;
