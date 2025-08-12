import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { db } from './db/db-index';
import fs from 'fs';
import path from 'path';

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

const app = express();
const port = process.env.SERVER_PORT;

// Create a write stream for our logs (ensure logs directory exists)
//
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'backend-fruity-morgan.log'),
  { flags: 'a' }
);

// Middleware
//
app.use(limiter);
app.use(cors());
app.use(helmet());

// Reduced the JSON limit to 10kb for this project.
//
app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev', {
    skip: (req, res) => req.url === '/health'
  }));
} else {
  // For "production" we'll log to a file.
  //
  app.use(morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => req.url === '/health'
  }));
}

app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
//
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);

  server.close((err) => {
    if (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }

    db.$client.end();

    console.log('Database connections closed');
    console.log('Server closed successfully');

    process.exit(0);
  });

  // Force shutdown after 5 seconds
  //
  setTimeout(() => {
    console.log('Forcing shutdown after timeout');

    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;