import { IFruitConsumption, ITotalConsumptionByLocation } from "@lepaya/shared/dist";
import { Request, Response } from "express";
import { createApiError } from "../middleware/errorHandler";
import { getFruitConsumption, getMostConsumedFruit, getTotalConsumption } from "../services/reports.service";
import { respondWithSuccess } from "../utils/generalUtils";
import { HttpStatus } from "../utils/httpsUtil";


export interface IConsumptionReport {
  detailed_consumption: IFruitConsumption[];
  total_consumption: ITotalConsumptionByLocation;
  most_consumed_fruit: IFruitConsumption;
}

export class ReportsController {
  static async getConsumptionReport(req: Request, res: Response): Promise<Response> {
    const { locationId, year } = req.params;

    if (!locationId || !year) {
      throw createApiError('Office ID and Year are required', 400);
    }

    const parseLocationId = parseInt(locationId, 10);
    const parseYear = parseInt(year, 10);

    if (isNaN(parseLocationId) || isNaN(parseYear)) {
      throw createApiError('Invalid office ID or year format', 400);
    }

    // Basic validation for reasonable year range
    const currentYear = new Date().getFullYear();
    if (parseYear < 2000 || parseYear > currentYear + 1) {
      throw createApiError(`Year must be between 2000 and ${currentYear + 1}`, 400);
    }

    const [fruitConsumption, totalConsumption, mostConsumedFruit] = await Promise.all([
      getFruitConsumption(parseLocationId, parseYear),
      getTotalConsumption(parseLocationId, parseYear),
      getMostConsumedFruit(parseLocationId, parseYear)
    ]);

    return respondWithSuccess(res, HttpStatus.OK, {
      detailed_consumption: fruitConsumption,
      total_consumption: totalConsumption,
      most_consumed_fruit: mostConsumedFruit
    });
  }
}