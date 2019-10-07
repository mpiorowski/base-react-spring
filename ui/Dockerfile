# Stage 1 - Create a builder container
FROM node:12.8-buster-slim as builder

WORKDIR /usr/src/app
COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY craco.config.js /usr/src/app/craco.config.js.js
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm run build

# Stage 2 - Create a downsized production container
FROM nginx:1.12-alpine as deploy

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
