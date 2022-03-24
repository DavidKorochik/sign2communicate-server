import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { db } from './db/postgres/db';
import userController from './controllers/user/userController';
import signingController from './controllers/signing/signingController';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userController);
app.use('/api/signing', signingController);

app.listen(process.env.PORT, async () => {
  await db();
  console.log(`App is running on port ${process.env.PORT}`);
});
