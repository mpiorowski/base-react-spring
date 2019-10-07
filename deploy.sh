#!/bin/sh
mkdir -p ./files ./logs
sudo chmod -R 777 ./files ./logs
docker-compose -f ./deploy/docker-compose.$1.yml up -d --build
