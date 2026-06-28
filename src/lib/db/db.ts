/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Dexie, { type Table } from 'dexie';
import { type Person } from '../types/person';

export class PrismDatabase extends Dexie {
  people!: Table<Person>;

  constructor() {
    super('PRISM');
    
    this.version(1).stores({
      people: 'id, isSelf, name, relationshipType, dob, createdAt, updatedAt'
    });
  }
}

export const db = new PrismDatabase();

// Handle database open gracefully to recover from any corrupt/mismatched local state
db.open().catch(async (err) => {
  console.error("Failed to open dexie database 'PRISM':", err);
  if (err.name === 'VersionError' || err.name === 'SchemaError' || err.name === 'UpgradeError') {
    console.warn("Schema/Version mismatch or upgrade error. Recreating database...");
    try {
      await Dexie.delete('PRISM');
      window.location.reload();
    } catch (deleteErr) {
      console.error("Failed to delete database:", deleteErr);
    }
  }
});
