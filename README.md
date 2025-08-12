# Lepaya Full Stack Assignment

Welcome to the fullstack assignment for engineering positions at Lepaya.

##  Quick Start

**One Command Setup:**
```bash
npm install && npm run deploy
```

This will:
1. Install all dependencies
2. Build all applications (shared, API, web)
3. Start all Docker containers with the database, API, and frontend

After the containers start, access:
- **Frontend Application**: http://localhost:3000
- **API Server**: http://localhost:3001  

The application includes:
- Fruit consumption reporting by office and year
- Stock management with calorie limits (250kcal max)
- PostgreSQL database with sample data
- REST API with proper error handling
- Responsive Preact frontend

## Testing

### API Tests (Backend)
```bash
# First, ensure database is running
docker-compose up -d db

# Run API tests
npm run test:api

# Run API tests in watch mode  
npm run test:watch --workspace=@lepaya/api
```

**Coverage:**
- Stock management (purchase validation, calorie limits)
- Consumption reports (data retrieval, validation)
- Error handling and edge cases

### E2E Tests (Frontend)
```bash
# Run E2E tests (requires app to be built and running)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui --workspace=@lepaya/web
```

**Coverage:**
- Stock management interface and workflows
- Consumption reports generation and display
- User interactions and form validation

### Run All Tests
```bash
npm run test:all
```
