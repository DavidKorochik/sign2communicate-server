import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../../entites/user/User';
import { Signing } from '../../entites/signing/Signing';

dotenv.config();

export const db = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 8080,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Signing],
      synchronize: true,
    });

    console.log('Connected to the database');
  } catch (err) {
    console.error(err);
  }
};
