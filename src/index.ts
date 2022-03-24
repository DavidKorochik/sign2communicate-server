import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { db } from './db/postgres/db';
import userRoutes from './routes/user/userRoutes';
import signingRoutes from './routes/signing/signingRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/signing', signingRoutes);

app.listen(process.env.PORT, async () => {
  await db();
  console.log(`App is running on port ${process.env.PORT}`);
});
