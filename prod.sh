#!/bin/sh
mkdir -p ./files
sudo chmod -R 777 ./files
sudo chmod -R 777 ./database/pgdata/

docker-compose -f ./docker/docker-compose.prod.yml up -d --build
