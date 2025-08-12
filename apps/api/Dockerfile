# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/
RUN npm ci

# Copy source code
COPY packages/shared ./packages/shared/
COPY apps/api ./apps/api/

# Build shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build API
WORKDIR /app/apps/api
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Install PostgreSQL client for pg_isready
RUN apk add --no-cache postgresql-client

ENV NODE_ENV=production
ENV SERVER_PORT=3001

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy package files and install production dependencies
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=nodejs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --chown=nodejs:nodejs apps/api/drizzle.config.ts ./apps/api/
COPY --chown=nodejs:nodejs apps/api/src/db/migrations ./apps/api/src/db/migrations

USER nodejs

EXPOSE 3001

CMD ["sh", "-c", "until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER; do echo 'Database is unavailable - sleeping'; sleep 2; done && echo 'Database is ready!' && exec node apps/api/dist/server.js"]
