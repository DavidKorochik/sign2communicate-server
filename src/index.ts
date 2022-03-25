import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { db } from './db/postgres/db';
import client from './db/redis/redis';
import userRoutes from './routes/user/userRoutes';
import signingRoutes from './routes/signing/signingRoutes';
import authRoutes from './routes/auth/authRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/signing', signingRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await db();
    console.log(`App is running on port ${process.env.PORT}`);
    await client.connect();
  } catch (err: any) {
    console.error(err.message);
  }
});
