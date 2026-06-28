/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from '../db/db';
import { type Person } from '../types/person';

export const personRepository = {
  async getSelf(): Promise<Person | undefined> {
    try {
      const all = await db.people.toArray();
      return all.find(p => p.isSelf === true);
    } catch (e) {
      console.error("Dexie getSelf error:", e);
      return undefined;
    }
  },

  async getPeople(): Promise<Person[]> {
    try {
      const all = await db.people.toArray();
      return all.filter(p => !p.isSelf);
    } catch (e) {
      console.error("Dexie getPeople error:", e);
      return [];
    }
  },

  async getById(id: string): Promise<Person | undefined> {
    return db.people.get(id);
  },

  async create(person: Person): Promise<string> {
    await db.people.add(person);
    return person.id;
  },

  async update(person: Person): Promise<void> {
    await db.people.put(person);
  },

  async delete(id: string): Promise<void> {
    await db.people.delete(id);
  }
};
export type PersonRepository = typeof personRepository;
