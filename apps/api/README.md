# API Server

Backend API server built with Node.js and PostgreSQL.

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Database

Uses PostgreSQL with Drizzle ORM for database operations and migrations.
- Database runs on port 5432

## Production

The API server runs on port 3001 and includes:
- Automatic database connection waiting
- Migration execution on startup
- Health checks for database connectivity

## Environment Variables

- `POSTGRES_HOST` - Database host
- `POSTGRES_PORT` - Database port
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB_NAME` - Database name
- `SERVER_PORT` - API server port
