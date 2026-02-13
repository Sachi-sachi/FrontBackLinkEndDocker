# Node LTS
FROM node:20-alpine

WORKDIR /app

# Install deps first (layer cache)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Expose the dev server port
EXPOSE 5173

# Run vite dev server, listen on all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]