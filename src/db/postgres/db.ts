import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../../entites/user/User.entity';
import { Signing } from '../../entites/signing/Signing.entity';

dotenv.config();

export const db = async () => {
  try {
    // await createConnection({
    //   url: process.env.DATABASE_URL,
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: 5432,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [User, Signing],
    //   synchronize: false,
    //   migrations: ['../../../dist/src/migrations/**/*.ts'],
    //   cli: {
    //     migrationsDir: '../../../dist/src/migrations/',
    //     entitiesDir: '../../../dist/src/entities',
    //   },
    // });

    await createConnection();

    console.log('Connected to the database');
  } catch (err) {
    console.error(err);
  }
};
