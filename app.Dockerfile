FROM node:18-alpine

RUN apk upgrade
RUN apk add --no-cache libc6-compat

ARG app=""

ENV NODE_ENV development
WORKDIR /app

COPY  ["yarn.lock", "package.json", "./"]
COPY  ["apps/${app}/package.json", "./apps/${app}/"]
COPY . .

RUN yarn
