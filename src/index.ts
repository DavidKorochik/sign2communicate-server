import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
