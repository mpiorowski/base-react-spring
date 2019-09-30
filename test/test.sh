#!/bin/sh

mkdir -p ./test/files ./test/logs ./test/database ./test/dump
sudo chmod -R 777 ./test/files ./test/logs
docker-compose -f ./test/docker-compose.test.yml up -d --build
