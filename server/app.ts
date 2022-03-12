/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';
import redis from 'redis';
import * as routes from './routes';

const app = express();
// database setup
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/mydb';
const mongooseConfigs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongoUri, mongooseConfigs);
/**
* Redis Setup. For more options for redis client, go to: https://www.npmjs.com/package/redis#options-object-properties
*/
const redisPort = parseInt(process.env.REDIS_PORT) || 6379;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisClient = redis.createClient(redisPort, redisHost);

redisClient.on('error', (error) => {
  console.error(error);
  console.log('[33m%s[0m', 'Make sure redis is installed and running.');
});

redisClient.on('connect', () => {
  console.log(`Redis connected in port: ${redisPort}`);
});
// --------------End of Redis Setup-----------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/api', routes.hello);
app.use('/api/users', routes.users);

export default app;
