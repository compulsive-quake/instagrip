import { IgApiClient } from 'instagram-private-api';
import * as redisController from './redisController';
import {db} from './knexController';

async function cookieSave(username: string, data: object) {
  await redisController.put('instagram:cookies', username, data);
}

interface InstagramAccount {
  username: string;
  password: string;
}

function cookieExists() {
  // here you would check if the data exists
  return false;
}

function cookieLoad() {
  // here you would load the data
  return '';
}

async function getAccounts() {
  const accounts = await redisController.getAll('instagram:accounts');

  return accounts;
}

export async function addAccount(account: InstagramAccount) {
  const {username, password} = account;

  if (!username) { throw new Error('empty username'); }
  if (!password) { throw new Error('empty password'); }

  await redisController.put('instagram:accounts', username, { username, password });

  const ig = new IgApiClient();
  ig.state.generateDevice(username);

  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await cookieSave(username, serialized);
  });

  await ig.account.login(username, password);
}

export async function init() {
  getAccounts();
}
