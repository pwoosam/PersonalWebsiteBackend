FROM node:11-alpine

WORKDIR /server

COPY ./dist ./dist
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "node",  "./dist/server.js" ]
