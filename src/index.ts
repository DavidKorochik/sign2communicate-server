import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { db } from './db/db';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(process.env.PORT, async () => {
  await db();
  console.log(`App is running on port ${process.env.PORT}`);
});
