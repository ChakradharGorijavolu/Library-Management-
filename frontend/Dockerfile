# ---------- Build stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build Vite app
RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

# Copy build output (Vite uses dist/, not build/)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
