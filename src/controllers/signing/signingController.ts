import { Signing } from '../../entites/signing/Signing';
import express, { Request, Response } from 'express';
import { RequestExtendedWithUser } from '../../interfaces/user/user';
import { ISigning } from '../../interfaces/signing/signing';
import client from '../../db/redis/redis';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';

dotenv.config();

const router = express.Router();

interface SigningUpdateBody {
  description: string;
  equipment: string[];
  returningDate: string;
  signingDate: string;
  time: string;
}

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
    await client.set(signing.id, JSON.stringify(signing));

    const signingCached = await client.get(signing.id);

    // Saving the signing to the database
    await signing.save();

    // Checking if there is the signing that was created cached, if not return the signing that was created from the database
    if (signingCached) {
      return res.status(201).json(JSON.parse(signingCached));
    } else {
      await client.set(signing.id, JSON.stringify(signing));
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
    const signings: ISigning[] = await Signing.find();

    if (!signings)
      return res.status(404).json({ error: 'There are no signings' });

    // Caching the signings
    await client.set('signings', JSON.stringify(signings));

    // Getting the cached signings
    const signingsCached = await client.get('signings');

    // Checking if there are any signings cached, if not return the signings from the database
    if (signingsCached) {
      return res.status(200).json(JSON.parse(signingsCached));
    } else {
      await client.set('signings', JSON.stringify(signings));
      return res.status(200).json(signings);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a signing @/api/signing/:id
export const updateSigning: any = async (req: Request, res: Response) => {
  const { equipment, signingDate, returningDate, time, description } = req.body;
  const obj = {} as SigningUpdateBody;

  if (description) obj.description = description;
  if (signingDate) obj.signingDate = signingDate;
  if (returningDate) obj.returningDate = returningDate;
  if (time) obj.time = time;
  if (equipment) obj.equipment = equipment;

  const id = req.params.id;

  try {
    // Finiding one signing with the id that is passed
    const signing = await Signing.findOne({ where: { id } });

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    // Merging the changes that were made from the req.body to the signing that we have found
    getRepository(Signing).merge(signing, obj);

    await getRepository(Signing).save(signing);

    // Saving the new updated signing
    return res.status(200).json(signing);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a signing @/api/signing/:id
export const deleteSigning: any = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Searching for the signing that we wish to delete
    const signing: ISigning | undefined = await Signing.findOne(id);

    if (!signing) return res.status(404).json({ error: 'Signing not found' });

    // Deleting the signing based on the id that was passed
    await Signing.delete(id);

    // Deleting the signing from the cache
    await client.del(id);

    // Get all of the signings after we delete the signing with the corrsponding id
    const signingsAfterDeletion: ISigning[] = await Signing.find();

    res.status(200).json(signingsAfterDeletion);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteAllSignings: any = async (req: Request, res: Response) => {
  try {
    // Find all the signings that we watn to delete
    const signings = await Signing.find();

    if (!signings) return res.status(404).json({ error: 'No signings found' });

    // Remove all of the signings
    await Signing.remove(signings);

    // Send all the signings that we are removing
    res.status(200).json(signings);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export default router;
