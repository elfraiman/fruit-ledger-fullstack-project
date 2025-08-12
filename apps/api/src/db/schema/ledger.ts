import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { locations } from './locations';

export const ledger = pgTable('ledger', {
  fruit_id: varchar('fruit_id').notNull(),
  location_id: integer('location_id').notNull().references(() => locations.id),
  amount: integer('amount'),
  time: timestamp('time', { withTimezone: true }).notNull(),
});


export type LedgerEntry = typeof ledger.$inferSelect;
export type NewLedgerEntry = typeof ledger.$inferInsert;