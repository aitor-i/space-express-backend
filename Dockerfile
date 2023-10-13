# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your Node.js app will listen on
EXPOSE 4000

# Start your Node.js application from the built output
CMD ["node", "./dist/index.js"]

