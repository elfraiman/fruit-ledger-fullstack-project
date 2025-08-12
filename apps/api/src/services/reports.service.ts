import { sql, eq, and, gte, lt, asc, desc } from "drizzle-orm";
import { db } from "../db/db-index";
import { ledger, locations, fruit } from "../db/schema";
import { getYearRange } from "../utils/generalUtils";
import { IFruitConsumption, ITotalConsumptionByLocation } from '@lepaya/shared/dist';
import { createApiError } from '../middleware/errorHandler';

export async function getFruitConsumption(locationId: number, year: number): Promise<IFruitConsumption[]> {
  const { start: startOfYear, end: startOfNextYear } = getYearRange(year);

  return db
    .select({
      fruit_name: fruit.name,
      total_eaten: sql<number>`SUM(CASE WHEN ${ledger.amount} < 0 THEN ABS(${ledger.amount}) ELSE 0 END)`
    })
    .from(ledger)
    .innerJoin(fruit, eq(ledger.fruit_id, sql<number>`${fruit.id}::varchar`))
    .where(
      and(
        gte(ledger.time, startOfYear),
        lt(ledger.time, startOfNextYear),
        eq(ledger.location_id, locationId)
      )
    )
    .groupBy(fruit.name)
    .orderBy(asc(sql`SUM(CASE WHEN ${ledger.amount} < 0 THEN ${ledger.amount} ELSE 0 END)`));
}

export async function getTotalConsumption(locationId: number, year: number): Promise<ITotalConsumptionByLocation> {
  const { start: startOfYear, end: startOfNextYear } = getYearRange(year);

  const result = await db
    .select({
      location_id: ledger.location_id,
      location_name: locations.name,
      total_fruit_consumed: sql<number>`SUM(ABS(${ledger.amount})) FILTER (WHERE ${ledger.amount} < 0)`,
      average_per_person: sql<number>`SUM(ABS(${ledger.amount})) FILTER (WHERE ${ledger.amount} < 0) / CAST(${locations.headcount} AS FLOAT)`,
      headcount: locations.headcount,
    })
    .from(ledger)
    .innerJoin(locations, eq(ledger.location_id, locations.id))
    .where(
      and(
        gte(ledger.time, startOfYear),
        lt(ledger.time, startOfNextYear),
        eq(ledger.location_id, locationId)
      )
    )
    .groupBy(ledger.location_id, locations.name, locations.headcount)
    .limit(1);

  if (!result[0]) {
    throw createApiError(`No consumption data found for location ${locationId}`, 404);
  }

  return result[0];
}
export async function getMostConsumedFruit(locationId: number, year: number): Promise<IFruitConsumption> {
  const { start: startOfYear, end: startOfNextYear } = getYearRange(year);

  const result = await db
    .select({
      fruit_name: fruit.name,
      total_eaten: sql<number>`SUM(CASE WHEN ${ledger.amount} < 0 THEN ABS(${ledger.amount}) ELSE 0 END)`
    })
    .from(ledger)
    .innerJoin(fruit, eq(ledger.fruit_id, sql<number>`${fruit.id}::varchar`))
    .where(
      and(
        gte(ledger.time, startOfYear),
        lt(ledger.time, startOfNextYear),
        eq(ledger.location_id, locationId)
      )
    )
    .groupBy(fruit.name)
    .orderBy(desc(sql<number>`SUM(CASE WHEN ${ledger.amount} < 0 THEN ABS(${ledger.amount}) ELSE 0 END)`))
    .limit(1);

  if (!result[0]) {
    throw createApiError(`No fruit consumption data found for location ${locationId} in year ${year}`, 404);
  }

  return result[0];
}