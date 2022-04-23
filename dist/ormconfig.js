"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
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
    synchronize: false,
    entities: [__dirname + 'dist/entites/**/*.entity.js'],
    cli: {
        migrationsDir: 'dist/migrations',
    },
};
