# Use Node.js base image to build the frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx as the production web server
FROM nginx:alpine

# Copy the built frontend files to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for frontend
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
