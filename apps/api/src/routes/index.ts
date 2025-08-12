import { Router } from 'express';
import fruitsRoutes from './fruitsRoutes';
import ledgerRoutes from './ledgerRoutes';
import locationsRoutes from './locationsRoutes';
import reportsRoutes from './reportsRoutes';

const router = Router();

// Basic health check
//
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/fruits', fruitsRoutes);
router.use('/locations', locationsRoutes);
router.use('/reports', reportsRoutes);
router.use('/ledger', ledgerRoutes);

export default router;