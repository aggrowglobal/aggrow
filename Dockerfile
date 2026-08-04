FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm install --no-audit --no-fund --include=dev || npm install --no-audit --no-fund --include=dev
RUN npm run build
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD npx drizzle-kit push && node dist/boot.js
