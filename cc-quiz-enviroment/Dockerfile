# Stage 1: Build Node.js Quiz App
FROM node:lts-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS node_build
WORKDIR /quiz-app
COPY quiz-app/package*.json ./
RUN npm install && npm audit fix
COPY quiz-app/ .
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# Stage 2: Build Python Creation Profile Cards App
FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7 AS python_build
WORKDIR /creation-profile-cards
COPY creation-profile-cards/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY creation-profile-cards/ .
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# Stage 3: Create Final Image with Both Apps
FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
WORKDIR /app
RUN apk add --no-cache nodejs npm
COPY --from=node_build /quiz-app /app/quiz-app
COPY --from=python_build /creation-profile-cards /app/creation-profile-cards
EXPOSE 5000 5173
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# ###WORKINGISH
# # Use latest stable Node.js (LTS) for security & reliability
# FROM node:lts-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS build
# WORKDIR /quiz-app
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# # Copy dependencies and install securely
# COPY quiz-app/package*.json ./
# # Uses `ci` for reproducible installs
# RUN npm audit fix --force && npm ci --omit=dev
# # Copy the full application
# COPY quiz-app/ .
# # Build the app for production
# RUN npm run build
# # Copy built files from the build stage
# COPY --from=build /quiz-app/dist /app/dist

# # Stage 2: Build Python Creation Profile Cards App
# FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7 AS python_build
# WORKDIR /creation-profile-cards
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# # Copy requirements and install dependencies securely
# COPY creation-profile-cards/requirements.txt ./
# # Ensures latest patches
# RUN pip install --no-cache-dir --upgrade -r requirements.txt
# # Copy the full application
# COPY creation-profile-cards/ .

# # Stage 3: Create Final Image (Optimized Runtime)
# FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
# WORKDIR /app
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# # Install Node.js & npm in the final image without cache
# RUN apk add --no-cache nodejs npm
# # Copy built applications from previous stages
# COPY --from=build /quiz-app/dist /app/dist
# COPY --from=build /quiz-app /app/quiz-app
# COPY --from=python_build /creation-profile-cards /app/creation-profile-cards

# # Expose ports for both applications
# EXPOSE 5000 5173

# # Run app in either development (`dev`) or production (`preview`) mode
# CMD ["npm", "run", "${MODE:-dev}"]

# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# ###



# # Stage 2: Create the production-ready image
# FROM node:lts-slim AS production
# WORKDIR /app
# # Install only production dependencies
# COPY --from=build /app/package.json ./
# RUN npm ci --omit=dev
# # Copy built files from the build stage
# COPY --from=build /app/dist /app/dist
# # Expose Vite’s server port
# EXPOSE 5173
# # Run app in either development (`dev`) or production (`preview`) mode
# CMD ["npm", "run", "${MODE:-dev}"]

# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Stage 1: Build Node.js Quiz App
# FROM node:lts-slim AS node_build
# WORKDIR /quiz-app
# # Copy dependencies and install securely
# COPY quiz-app/package*.json ./
# # Uses `ci` for reproducible installs
# RUN npm ci && npm audit fix --force
# # Copy the full application
# COPY quiz-app/ .
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Stage 2: Build Python Pet Profile Cards App
# FROM python:3.12-alpine AS python_build
# WORKDIR /pet-profile-cards
# # Copy requirements and install dependencies securely
# COPY pet-profile-cards/requirements.txt ./
# # Ensures latest patches
# RUN pip install --no-cache-dir --upgrade -r requirements.txt
# # Copy the full application
# COPY pet-profile-cards/ .
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Stage 3: Create Final Image (Optimized Runtime)
# FROM python:3.12-alpine
# WORKDIR /app
# # Install Node.js & npm in the final image without cache
# RUN apk add --no-cache nodejs npm
# # Copy built applications from previous stages
# COPY --from=node_build /quiz-app /app/quiz-app
# COPY --from=python_build /pet-profile-cards /app/pet-profile-cards
# # Expose ports for both applications
# EXPOSE 5000 5173
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Run app in either development (`dev`) or production (`preview`) mode
# CMD ["npm", "run", "${MODE:-dev}"]


# # Stage 1: Build Node.js Quiz App
# FROM node:slim@sha256:dfb18d8011c0b3a112214a32e772d9c6752131ffee512e974e59367e46fcee52 AS node_build
# WORKDIR /quiz-app
# COPY quiz-app/package*.json ./
# RUN npm install && npm audit fix
# COPY quiz-app/ .
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"


# # Stage 2: Build Python Pet Profile Cards App
# FROM python:alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7 AS python_build
# WORKDIR /pet-profile-cards
# COPY pet-profile-cards/requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt
# COPY pet-profile-cards/ .
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"


# # Slim Python image includes Python, and we’ll install Node.js manually
# # Stage 3: Create Final Image
# FROM python:alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
# WORKDIR /app
# # Install Node.js
# RUN apk add --no-cache nodejs npm
# COPY --from=node_build /quiz-app /app/quiz-app
# COPY --from=python_build /pet-profile-cards /app/pet-profile-cards
# EXPOSE 5000 5173
# # Add author information
# LABEL maintainer="Connor (https://github.com/thaumaturgists/)"

# # Set the default command (Modify this if needed)
# CMD ["bash"]