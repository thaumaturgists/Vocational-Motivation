# Use latest stable Node.js (LTS) for security & reliability
FROM node:lts-slim@sha256:157c7ea6f8c30b630d6f0d892c4f961eab9f878e88f43dd1c00514f95ceded8a AS build
WORKDIR /quiz-app
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# Copy dependencies and install securely
COPY quiz-app/package*.json ./
# Uses `ci` for reproducible installs
RUN npm ci --omit=dev
# Copy the full application
COPY quiz-app/ .
# Build the app for production
RUN npm run build

# Stage 2: Build Python Creation Profile Cards App
FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7 AS python_build
WORKDIR /creation-profile-cards
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# Copy requirements and install dependencies securely
COPY creation-profile-cards/requirements.txt ./
# Ensures latest patches
RUN pip install --no-cache-dir --upgrade -r requirements.txt
# Copy the full application
COPY creation-profile-cards/ .

# Stage 3: Create Final Image (Optimized Runtime)
FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
WORKDIR /app
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
# Install Node.js & npm in the final image without cache
RUN apk add --no-cache nodejs npm
# Copy built applications from previous stages
COPY --from=build /quiz-app/dist /app/dist
COPY --from=build /quiz-app /app/quiz-app
COPY --from=python_build /creation-profile-cards /app/creation-profile-cards

# Expose ports for both applications
EXPOSE 5000 5173

# Run app in either development (`dev`) or production (`preview`) mode
CMD ["npm", "run", "${MODE:-dev}"]