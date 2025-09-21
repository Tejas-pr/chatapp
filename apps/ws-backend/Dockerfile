FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/ws-backend/package*.json ./apps/ws-backend/

COPY . .

EXPOSE 8080

ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379

RUN pnpm run build

CMD ["pnpm", "run", "dev"]
