# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/uploads ./uploads

# Create uploads directory if it doesn't exist
RUN mkdir -p ./uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "src/server.js"] 