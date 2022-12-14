import IORedis from 'ioredis';
import { redis } from '../../config.json';
import * as log from './log';

export const red = new IORedis(redis);

red.on('error', log.error);

export async function write(name: string, id: string, data: unknown) {
  const path = `${redis.prefix}:${name}:${id}`;
  let stringData: string;

  try {
    stringData = JSON.stringify(data);
  } catch (e) {
    throw new Error('failed to stringify data object');
  }

  await red.call("JSON.SET", path, "$", stringData);
}

export async function read(name: string, id: string) {
  const path = `${redis.prefix}:${name}:${id}`;

  return red.call("JSON.GET", path, "$");
}

export async function all(name: string) {
  const path = `${redis.prefix}:${name}`;

  return red.call("JSON.GET", path, "$");
}
