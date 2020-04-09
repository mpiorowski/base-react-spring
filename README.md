# React and Spring application with fully working auth and logging components. 

Frontend  -> react + antd
Backend   -> spring boot + flyway + mybatis + postgres

- Authorization via jwt tokens
- Multi role support
- Register functionality with authorization code
- Rest communication via encrypted uuid
- Postgres logging and auditing
- Full docker deployment, ready for SSL
- Base forum functionality for showcase
- Swagger documentation...in progress

# Deployment

## Prerequisites and Dependencies

To run the application the only needed prerequisites are docker and docker-compose.

Dependencies needed when developing without docker: node, npm, java, gradle

## Development deployment
Run the development docker setup with log output for all services using:
```
sh dev.sh
```

Access via http://localhost:3000


## Production deployment with downsized containers and ssl certificate

Current build uses letsencrypt ssl certificate. If another one is installed,
it need to be pointed in docker/docker-compose.prod.yml and docker/nginx-prod.conf files.

If letsencrypt is enough, instalation can be done using:

```
certbot-auto certonly --standalone -d your.domain.com  -d www.your.domain.com
openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
```

Replace all domain names with your.domain.com in docker/nginx-prod.conf file;

Run the production docker setup using:
```
sh prod.sh
```

Access via https://localhost or https://your.domain.com

# Swagger

In progress...
