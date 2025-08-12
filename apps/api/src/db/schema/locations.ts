import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const locations = pgTable('location', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  headcount: varchar('headcount'),
});


export type ILocation = typeof locations.$inferSelect;
export type ILocationInsert = typeof locations.$inferInsert;