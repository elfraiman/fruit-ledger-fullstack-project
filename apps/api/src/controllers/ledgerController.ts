import { Request, Response } from 'express';
import { purchaseFruit } from "../services/ledger.service";
import { respondWithSuccess } from "../utils/generalUtils";
import { HttpStatus } from "../utils/httpsUtil";
import { IFruitPurchaseWithCalories } from "@lepaya/shared/dist";
import { createApiError } from '../middleware/errorHandler';

export class LedgerController {
  static async purchaseFruit(req: Request, res: Response) {
    const { fruits, locationId } = req.body;

    if (!fruits || !locationId) {
      throw createApiError('Fruit ID, location ID, and amount are required', 400);
    }

    const totalCalories = fruits.reduce((total: number, fruit: IFruitPurchaseWithCalories) => total + (fruit.calories || 0), 0);

    if (totalCalories > 250 || totalCalories <= 0) {
      throw createApiError('Total calories cannot be greater than 250 or less than 0', 400);
    }

    const newLedgerEntries = await purchaseFruit(fruits, locationId);
    return respondWithSuccess(res, HttpStatus.CREATED, newLedgerEntries);
  }
}
