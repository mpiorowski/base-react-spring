#connect
docker exec -it dev-database-app psql -U admin -d app

#dl
#scp -i ~/.ssh/ovh-prod.pub mat@147.135.211.160:/home/mat/pbs-diary/prod/dump/* .
