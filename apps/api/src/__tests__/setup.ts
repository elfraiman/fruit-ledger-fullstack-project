import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

process.env.NODE_ENV = 'test';
process.env.POSTGRES_HOST = process.env.POSTGRES_HOST;
process.env.POSTGRES_PORT = process.env.POSTGRES_PORT;
process.env.POSTGRES_USER = process.env.POSTGRES_USER;
process.env.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
process.env.POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME;
process.env.SERVER_PORT = process.env.SERVER_PORT;

// Increase timeout for database operations
jest.setTimeout(10000);

// Global teardown
afterAll(async () => {
  // Give time for any pending operations to complete
  await new Promise(resolve => setTimeout(resolve, 500));
});
