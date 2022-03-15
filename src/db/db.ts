import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const db = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Connected to the database');
  } catch (err) {
    console.error(err);
  }
};
