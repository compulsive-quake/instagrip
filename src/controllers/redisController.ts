import IORedis from 'ioredis';
import { redis } from '../config.json';
import * as log from './logController';

export const red = new IORedis(redis);

export async function init() {

  red.on('error', log.error);

}

export async function put(
  name: string,
  id: string,
  data: unknown
) {
  const path = `${name}:${id}`;
  let stringData: string;

  try {
    stringData = JSON.stringify(data);
  } catch (e) {
    throw new Error('failed to stringify data object');
  }

  await red.call("JSON.SET", path, "$", stringData);
}

export async function getOne(name: string, id: string) {
  const path = `${name}:${id}`;

  return red.call("JSON.GET", path, "$");
}

export async function getAll(path: string) {

  return red.call("JSON.GET", path);
}
