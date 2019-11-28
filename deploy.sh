#!/bin/sh
mkdir -p ./files
sudo chmod -R 777 ./files

chmod +x init-letsencrypt.sh
sudo sh init-letsencrypt.sh

docker-compose -f ./docker/docker-compose.$1.yml up -d --build
