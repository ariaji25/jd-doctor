FROM node:19-alpine

WORKDIR /usr/src/app

ARG  CI=true

RUN apk add --update git
RUN rm -rf node_modules
COPY . .
COPY package.json ./
RUN yarn
