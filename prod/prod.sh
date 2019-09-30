#!/bin/sh

mkdir -p ./prod/files ./prod/logs ./prod/database ./prod/dump
sudo chmod -R 777 ./prod/files ./prod/logs
docker-compose -f ./prod/docker-compose.prod.yml up -d --build
