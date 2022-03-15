import { createConnection } from 'typeorm';

export const db = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'postgres',
      password: 'davdav0908',
      database: 'sign2communicate',
    });

    console.log('Connected to the database');
  } catch (err) {
    console.error(err);
  }
};
