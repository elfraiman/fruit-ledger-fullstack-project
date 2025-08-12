import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const fruit = pgTable('fruit', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  fruityvice_id: integer('fruityvice_id'),
});


export type Fruit = typeof fruit.$inferSelect;
export type NewFruit = typeof fruit.$inferInsert;