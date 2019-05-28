### STAGE 1: Build ###
FROM node:10-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

## Build the angular app
RUN npm run build

FROM nginx:1.14.1-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy build from previous stage to nginx folder
COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
