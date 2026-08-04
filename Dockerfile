FROM node:20-slim
WORKDIR /app

# Single layer: copy everything, install ALL deps (incl. build tools), build.
# One combined step so no stale cached layer can skip the install.
COPY . .
RUN npm install --no-audit --include=dev && npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Create database tables (idempotent) then start the server
CMD npx drizzle-kit push && node dist/boot.js
