FROM node:20-slim
WORKDIR /app

# Build phase needs devDependencies (vite, esbuild, typescript) even in production
ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm ci --no-audit --include=dev

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Create database tables (idempotent) then start the server
CMD npx drizzle-kit push && node dist/boot.js
