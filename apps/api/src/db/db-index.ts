import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config();

// Build connection string from environment variables
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB_NAME;

const connectionString = process.env.DATABASE_URL ||
  `postgresql://${user}:${password}@${host}:${port}/${database}`;

console.log(`Connecting to database: postgresql://${user}:***@${host}:${port}/${database}`);

const sql = postgres(connectionString, { prepare: false });

export const db = drizzle(sql);
