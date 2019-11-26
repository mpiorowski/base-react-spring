#!/bin/bash

cd "${0%/*}" || exit
#dump
mkdir -p files/dump
docker exec -t $1-database-base pg_dumpall -c -U admin | gzip > ./files/dump/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gz

#dl
#scp -i ~/.ssh/ovh-prod mat@147.135.211.160:/home/mat/pbs-diary/prod/dump/* .

#restore
#gunzip -c dump_23-09-2019_22_35_18.sql.gz | docker exec -i dev-database-diary psql postgres -U admin
