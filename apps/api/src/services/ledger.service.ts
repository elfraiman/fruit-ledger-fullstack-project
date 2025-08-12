import { db } from "../db/db-index";
import { ledger } from "../db/schema";
import { IFruitPurchase } from "@lepaya/shared/dist";
import { log } from "../utils/logger";
import { createApiError } from '../middleware/errorHandler';

export async function purchaseFruit(fruits: IFruitPurchase[], locationId: number) {
  // Validation
  if (!fruits || fruits.length === 0) {
    throw createApiError('No fruits provided for purchase', 400);
  }

  if (!locationId || locationId <= 0) {
    throw createApiError('Invalid location ID', 400);
  }
  for (const fruit of fruits) {
    if (!fruit.id || fruit.id <= 0) {
      throw createApiError('Invalid fruit ID', 400);
    }
    if (!fruit.amount || fruit.amount <= 0) {
      throw createApiError('Invalid fruit amount', 400);
    }
  }

  try {
    const ledgerEntries = fruits.map(fruit => ({
      fruit_id: fruit.id.toString(),
      location_id: locationId,
      amount: fruit.amount,
      time: new Date(),
    }));

    const newLedgerEntries = await db.insert(ledger).values(ledgerEntries).returning();

    log.info(`[LedgerService] Purchased ${fruits.length} fruits for location ${locationId}`);
    return newLedgerEntries;
  } catch (error: any) {
    log.error(`[LedgerService] Error purchasing fruits for location ${locationId}:`, error.message);
    throw createApiError('Failed to process fruit purchase', 500, false);
  }
}