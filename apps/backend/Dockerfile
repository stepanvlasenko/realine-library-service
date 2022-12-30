FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN yarn global add turbo pnpm

COPY package.json  ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY . .

RUN pnpm install
