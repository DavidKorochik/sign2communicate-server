const doteenv = require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  entities: ['./dist/entites/**/*.entity.js'],
  migrations: ['./dist/migrations/**/*.js'],
  cli: {
    entitiesDir: './dist/entites',
    migrationsDir: './dist/migrations',
  },
};
