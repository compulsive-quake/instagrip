import { IgApiClient } from 'instagram-private-api';
import { red } from './queue';


async function cookieSave(data: object) {
  await red.call("JSON.SET", "doc", "$", '{"f1": {"a":1}, "f2":{"a":2}}');
  // here you would save it to a file/database etc.
  // you could save it to a file: writeFile(path, JSON.stringify(data))
  return data;
}

function cookieExists() {
  // here you would check if the data exists
  return false;
}

function cookieLoad() {
  // here you would load the data
  return '';
}

(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice();

  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants; // this deletes the version info, so you'll always use the version provided by the library
    await cookieSave(serialized);
  });

  if (cookieExists()) {
    await ig.state.deserialize(cookieExists());
  }
  // This call will provoke request.end$ stream
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  // Most of the time you don't have to login after loading the state
})();