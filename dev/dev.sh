#!/bin/sh
#docker stop $(docker ps -aq)
#mkdir -p ./docker/database/dev-database
#sudo chown -R $USER:$USER ./docker/database/dev-database
docker-compose -f ./dev/docker-compose.dev.yml up -d
