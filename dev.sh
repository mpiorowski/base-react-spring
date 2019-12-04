docker-compose -f ./docker/docker-compose.dev.yml up -d --build
docker-compose -f ./docker/docker-compose.dev.yml logs -f --tail 100
