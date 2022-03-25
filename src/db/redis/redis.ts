// @ts-ignore

import * as redis from 'redis';

const client = redis.createClient();

client.on('error', (err: any) => console.error(err.message));
client.on('connect', () => console.log('Connected to cache databse'));

export default client;
