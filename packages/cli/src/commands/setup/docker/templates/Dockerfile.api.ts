export const DOCKERFILE_API = `FROM node:16

EXPOSE 8911

WORKDIR /app
RUN mkdir ./api

COPY ./package.json ./yarn.lock .
COPY ./api/package.json ./api

RUN yarn install --frozen-lockfile

COPY ./api ./api
COPY ./redwood.toml ./.redwood ./.env .
COPY ./docker/entrypoint.api.sh ./docker/

RUN yarn add react react-dom -W

ENTRYPOINT ./docker/entrypoint.api.sh
`
