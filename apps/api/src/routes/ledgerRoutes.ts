import { Router } from "express";
import { LedgerController } from "../controllers/ledgerController";
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/purchase', asyncHandler(LedgerController.purchaseFruit));

export default router;
