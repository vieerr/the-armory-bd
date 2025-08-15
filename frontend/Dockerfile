# ./frontend/Dockerfile.dev
# FROM node:18-alpine

# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g @angular/cli 
# RUN npm install --force

# EXPOSE 4200
# CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]

# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/the-armory/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

