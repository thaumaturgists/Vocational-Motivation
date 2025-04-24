# Use Multi-Stage Build (Optional but recommended)
FROM node:lts-slim AS build
WORKDIR /app
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM node:lts-slim AS production
WORKDIR /app
# Add author information
LABEL maintainer="Connor (https://github.com/thaumaturgists/)"
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json ./
RUN npm ci --omit