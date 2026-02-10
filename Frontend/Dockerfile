# -------- Build Stage --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# -------- Runtime Stage --------
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 8001

CMD ["serve", "-s", "dist", "-l", "8081"]
