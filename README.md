# Diary application

This application is still in progress.

- Diary application with moderator functionality.  
- Full user and role management.  
- Postgres logging and auditing.  
- Swagger documentation...in progress
- Authorization via jwt tokens. 
- Rest using encrypted uuid

Frontend  -> react + antd + (react redux...in progress)  
Backend   -> spring boot + flyway + mybatis + postgresql

## Initial access
http://localhost:3000 (dev)  
(or http://localhost (prod)...in progress)  
username: admin  
password: pass  

# Deployment

## Prerequisites and Dependencies
Prerequisites: node, npm, java, gradle, docker, docker-compose

Install dependencies:
```
./api/gradlew -p ./api/ build --refresh-dependencies
```
```
npm --prefix ./ui install ./ui
```

## Development deployment

### database
PostgreSQL 10.5 (configuration in application.yml):  
port:   5444  
scheme: pbs  
user:   admin  
pass:   admin  

or You can use docker-compose to setup simple database container
```
docker-compose -f ./docker/docker-compose.database.yml up -d --build
```

### frontend and backend
Run two separate shell windows for frontend and backend.
(Or just use your favorite IDE :) )
```
./api/gradlew -p ./api/ bootRun
```
```
npm --prefix ./ui start
```

Access via http://localhost:3000


## Production deployment using docker-compose with downsized containers

In progress...

# Swagger

In progress...
