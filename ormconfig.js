module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  url: process.env.TYPEORM_URL,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  entities: [process.env.TYPEORM_ENTITIES],
  cli: {
    migrationsDir: 'dist/migrations',
  },
};
