#!/bin/sh
mkdir -p ./files
sudo chmod -R 777 ./files

chmod +x ./docker/init-letsencrypt.sh
sudo sudo ./docker/init-letsencrypt.sh

docker-compose -f ./docker/docker-compose.prod.yml up -d --build
