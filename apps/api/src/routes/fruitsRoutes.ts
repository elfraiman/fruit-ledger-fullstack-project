import { Router } from 'express';
import { FruitsController } from '../controllers/fruitsController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(FruitsController.getAllFruits));

export default router;