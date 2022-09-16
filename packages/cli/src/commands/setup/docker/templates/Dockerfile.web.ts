export const DOCKERFILE_WEB = `FROM node:16

EXPOSE 8910

WORKDIR /app
RUN mkdir ./web

COPY ./package.json ./yarn.lock .
COPY ./web/package.json ./web

RUN yarn install --frozen-lockfile

COPY ./web ./web
COPY ./redwood.toml ./.env ./graphql.config.js .
COPY ./docker/entrypoint.web.sh ./docker/

ENTRYPOINT ./docker/entrypoint.web.sh
