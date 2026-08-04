FROM node:22-slim
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY . .
RUN pnpm config set dangerously-allow-all-builds true
RUN pnpm install --no-frozen-lockfile
RUN pnpm build
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD npx drizzle-kit push && node dist/boot.js
