import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../../entites/user/User.entity';
import { Signing } from '../../entites/signing/Signing.entity';

dotenv.config();

export const db = async () => {
  try {
    await createConnection({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [User, Signing],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    });

    console.log('Connected to the database');
  } catch (err) {
    console.error(err);
  }
};
