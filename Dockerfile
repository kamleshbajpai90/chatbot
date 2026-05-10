# Use Node.js 20 (Next.js requires >=20.9.0)
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# Install ALL dependencies (not just production)
RUN npm install

# Copy rest of the application
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
