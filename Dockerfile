FROM node:20-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Create database tables (idempotent) then start the server
CMD npx drizzle-kit push && node dist/boot.js
