# Stage 1: Build the application
FROM node:lts-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS build

# Set the working directory
WORKDIR /usr/src/app

# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port (Nginx default port)
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

