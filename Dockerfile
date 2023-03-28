FROM node:19-alpine as builder

ARG BUILD_TYPE

WORKDIR /usr/src/app
COPY . .

# TODO: Separate build and runtime image
RUN echo "Build For $BUILD_TYPE"
RUN yarn install --network-timeout 1000000
RUN yarn build:$BUILD_TYPE

FROM node:14-alpine
RUN yarn global add serve
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build /usr/src/app/build
CMD [ "serve", "-l", "3000", "-s", "build" ]
