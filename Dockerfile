# Build stage
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies (including devDependencies needed for build)
RUN npm ci

# Copy source code
COPY src ./src

# Build the application
RUN npm run build && \
    ls -la dist/ && \
    test -f dist/main.js || (echo "ERROR: dist/main.js not found after build!" && exit 1)

# Production stage
FROM node:22-bookworm-slim AS sun-tracker

ARG APP=sun-tracker

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Verify dist was copied correctly
RUN ls -la dist/ 2>/dev/null && \
    test -f dist/main.js || (echo "ERROR: dist/main.js not found after copy!" && exit 1)

# Create non-root user
RUN groupadd -r -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs -s /bin/bash nestjs

# Change ownership of application files
RUN chown -R nestjs:nodejs /usr/src/app

# Switch to non-root user
USER nestjs

# Expose port (default 3000, can be overridden via PORT env var)
EXPOSE 3000

# Health check (check if HTTP server is responding)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/sun-altitude', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

CMD ["node", "dist/main.js"]
