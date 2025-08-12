import { Router } from "express";
import { LocationController } from "../controllers/locationController";
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(LocationController.getLocations));
router.get('/:id', asyncHandler(LocationController.getLocationById));

export default router;