import request from 'supertest';
import express from 'express';
import apiRoutes from '../routes';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler';

// Create test app
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

describe('Ledger API - Stock Management', () => {
  describe('POST /api/ledger/purchase', () => {
    it('should successfully purchase fruits within calorie limit', async () => {
      const purchaseData = {
        fruits: [
          { id: 1, amount: 5, calories: 50 },
          { id: 2, amount: 3, calories: 30 }
        ],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should reject purchase when total calories exceed 250', async () => {
      const purchaseData = {
        fruits: [
          { id: 1, amount: 10, calories: 200 },
          { id: 2, amount: 5, calories: 100 }
        ],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('Total calories cannot be greater than 250');
    });

    it('should reject purchase with 0 calories', async () => {
      const purchaseData = {
        fruits: [
          { id: 1, amount: 0, calories: 0 }
        ],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('Total calories cannot be greater than 250 or less than 0');
    });

    it('should reject purchase with missing required fields', async () => {
      const purchaseData = {
        fruits: [{ id: 1, amount: 5, calories: 50 }],
        // No location Id
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('location ID');
    });

    it('should reject empty fruits array', async () => {
      const purchaseData = {
        fruits: [],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('Total calories cannot be greater than 250 or less than 0');
    });

    it('should reject purchase with invalid fruit ID', async () => {
      const purchaseData = {
        fruits: [
          { id: 0, amount: 5, calories: 50 }
        ],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('Invalid fruit ID');
    });

    it('should reject purchase with invalid amount', async () => {
      const purchaseData = {
        fruits: [
          { id: 1, amount: 0, calories: 50 }
        ],
        locationId: 1
      };

      const response = await request(app)
        .post('/api/ledger/purchase')
        .send(purchaseData)
        .expect(400);

      expect(response.body.error).toContain('Invalid fruit amount');
    });

  });
});
