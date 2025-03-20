# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project files into the container
COPY . .

# Expose the port (React uses 3000 by default)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
 
