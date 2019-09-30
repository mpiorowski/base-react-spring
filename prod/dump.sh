#dump

docker exec -t prod-database-diary pg_dumpall -c -U admin | gzip > ./dump/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gz

#restore
#gunzip -c dump_23-09-2019_22_35_18.sql.gz | docker exec -i dev-database-diary psql postgres -U admin

#dl
#scp -i ~/.ssh/ovh-prod.pub mat@147.135.211.160:/home/mat/pbs-diary/prod/dump/* .
