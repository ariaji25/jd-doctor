FROM node:14-alpine

WORKDIR /usr/src/app

ARG  CI=true

RUN apk add --update git
COPY package.json ./
RUN rm -rf node_modules
RUN yarn
COPY . .
