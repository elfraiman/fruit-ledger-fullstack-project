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

describe('Reports API - Consumption Analytics', () => {
  describe('GET /api/reports/consumption/:locationId/:year', () => {
    it('should return consumption report for valid location and year', async () => {
      const locationId = 1; // Amsterdam
      const year = 2024;

      const response = await request(app)
        .get(`/api/reports/consumption/${locationId}/${year}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();

      const reportData = response.body.data;
      expect(reportData).toHaveProperty('detailed_consumption');
      expect(reportData).toHaveProperty('total_consumption');
      expect(reportData).toHaveProperty('most_consumed_fruit');

      expect(Array.isArray(reportData.detailed_consumption)).toBe(true);
      expect(typeof reportData.total_consumption).toBe('object');
      expect(typeof reportData.most_consumed_fruit).toBe('object');
    });

    it('should return error for location/year with no consumption', async () => {
      const locationId = 1;
      const year = 2000; // Year with no data

      const response = await request(app)
        .get(`/api/reports/consumption/${locationId}/${year}`)
        .expect(404);

      expect(response.body.error).toContain('No fruit consumption data found');
    });

    it('should reject invalid location ID format', async () => {
      const response = await request(app)
        .get('/api/reports/consumption/invalid/2024')
        .expect(400);

      expect(response.body.error).toContain('Invalid office ID or year format');
    });

    it('should reject invalid year format', async () => {
      const response = await request(app)
        .get('/api/reports/consumption/1/invalid')
        .expect(400);

      expect(response.body.error).toContain('Invalid office ID or year format');
    });

  });

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
