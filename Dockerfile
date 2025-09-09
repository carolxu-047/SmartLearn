# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the React app
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV PORT 8080

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]