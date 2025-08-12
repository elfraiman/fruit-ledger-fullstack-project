import { Router } from "express";
import { ReportsController } from "../controllers/reportsController";
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/consumption/:locationId/:year', asyncHandler(ReportsController.getConsumptionReport));

export default router;