# Stage 1 - Create a builder container
FROM node:12.8-buster-slim as dev

ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME
COPY src $APP_HOME/src
COPY public $APP_HOME/public
COPY craco.config.js $APP_HOME/craco.config.js.js
COPY package.json $APP_HOME/package.json
COPY package-lock.json $APP_HOME/package-lock.json
RUN npm install
CMD ["npm", "start"]

FROM dev as builder
RUN npm run build

# Stage 2 - Create a downsized production container
FROM nginx:1.17-alpine as deploy

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
