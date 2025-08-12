import { eq } from 'drizzle-orm';
import { db } from '../db/db-index';
import { Request, Response } from 'express';
import { locations } from '../db/schema/locations';
import { respondWithSuccess } from '../utils/generalUtils';
import { HttpStatus } from '../utils/httpsUtil';
import { createApiError } from '../middleware/errorHandler';

export class LocationController {
  static async getLocations(req: Request, res: Response) {
    const allLocations = await db
      .select()
      .from(locations)
      .orderBy(locations.name);

    if (!allLocations.length) {
      throw createApiError('No locations found', 404);
    }

    return respondWithSuccess(res, HttpStatus.OK, allLocations);
  }


  static async getLocationById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const locationId = parseInt(id);

    if (isNaN(locationId)) {
      throw createApiError('Invalid location id provided', 400);
    }

    const locationFromDb = await db
      .select()
      .from(locations)
      .where(eq(locations.id, locationId))
      .limit(1);

    if (!locationFromDb.length) {
      throw createApiError(`Location with id ${locationId} not found`, 404);
    }

    return respondWithSuccess(res, HttpStatus.OK, locationFromDb);
  }
}