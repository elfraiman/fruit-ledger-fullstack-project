import { Request, Response } from 'express';
import { getFruitsWithCalories } from '../services/fruit.service';
import { respondWithSuccess } from '../utils/generalUtils';
import { HttpStatus } from '../utils/httpsUtil';

export class FruitsController {
  static async getAllFruits(req: Request, res: Response) {
    const fruitsWithCalories = await getFruitsWithCalories();
    return respondWithSuccess(res, HttpStatus.OK, fruitsWithCalories);
  }
}