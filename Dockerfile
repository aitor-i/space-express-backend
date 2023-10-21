# Use the official Node.js image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files to the container
COPY . .

# Expose the port your application will run on
EXPOSE 4000

# Build the application
RUN npm run build

# Start your Node.js application
CMD ["node", "./dist/index.js"]
