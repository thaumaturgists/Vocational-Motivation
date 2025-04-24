FROM node:lts-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install && npm audit fix

# Copy the rest of the application
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Command to start the app
CMD ["npm", "run", "${MODE:-dev}"]

# ###WORKINGISH
# # Use Multi-Stage Build (Optional but recommended) Instead of using just one stage, 
# # create a production stage to copy only what’s needed:
# FROM node:lts-slim AS build
# WORKDIR /app
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY . .
# RUN npm run build

# FROM node:lts-slim AS production
# WORKDIR /app
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# COPY --from=build /app/dist /app/dist
# COPY --from=build /app/package.json ./
# RUN npm ci --omit=dev
# EXPOSE 5173
# CMD ["npm", "run", "${MODE:-dev}"]
# ###


# # Use a lightweight and secure Node.js image
# FROM node:lts-slim

# # Set the working directory inside the container
# WORKDIR /app

# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install && npm audit fix

# # Copy the rest of the application
# COPY . .

# # Expose the Vite dev server port
# EXPOSE 5173

# # Command to start the app
# CMD ["npm", "run", "dev"]