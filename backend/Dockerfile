# Base image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Enable pnpm and install it globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only package files
COPY backend/pnpm-lock.yaml backend/package.json ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy backend source code
COPY backend ./

# Expose port
EXPOSE 3000

# Run using the start script (which uses cross-env)
CMD ["pnpm", "start"]
