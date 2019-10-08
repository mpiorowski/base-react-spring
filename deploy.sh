#!/bin/sh
mkdir -p ./files ./logs
sudo chmod -R 777 ./files ./logs
docker-compose -f ./docker/docker-compose.$1.yml up -d --build
