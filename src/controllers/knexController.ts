import knex, {Knex} from 'knex';
import { SQL } from '../config.json';
import * as log from './logController';

export const db: Knex = knex(SQL);

/**
 * apply the latest migration files to db
 */
export async function migrate() {
  try {
    return await db.migrate.latest();
  } catch (err) {
    log.error('failed migration', err);
  }
}

/**
 * apply the latest migration files to db
 */
export async function seed() {
  try {
    const seedResults = await db.seed.run();
  } catch (err) {
    log.error('failed seed', err);
  }
}