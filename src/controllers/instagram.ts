import { IgApiClient } from 'instagram-private-api';
import * as queue from './queue';

async function cookieSave(username: string, data: object) {
  await queue.write('instagram:cookies', username, data);
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
  const accounts = await queue.read('accounts')
}

async function login(username: string, password: string, proxyUrl?: string) {


  const ig = new IgApiClient();
  ig.state.generateDevice(username);
  if (proxyUrl) {
    ig.state.proxyUrl = proxyUrl;
  }

  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await cookieSave(username, serialized);
  });

  await ig.account.login(username, password);

}

async function init() {

}
