import IORedis from 'ioredis';
import { redis } from '../../config.json';
import * as log from './log';

export const red = new IORedis(redis);

red.on('error', log.error);
