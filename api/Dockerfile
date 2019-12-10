# Stage 1 - Create a builder container
FROM gradle:jdk11 as dev

ENV APP_HOME=/home/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
COPY . .
#CMD ["gradle", "clean", "bootRun"]

FROM dev as builder
RUN gradle build -x test

# Stage 2 - Create a downsized production container
FROM openjdk:11 as deploy

RUN groupadd --system --gid 1000 deploy
RUN useradd --system --gid deploy --uid 1000 --shell /bin/bash --create-home deploy
USER deploy
WORKDIR /home/app/
COPY --from=builder /home/app/build/libs/api-*.jar /home/app/api.jar

CMD ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "/home/app/api.jar"]


#
#
#
#
## Stage 1 - Create a builder container
#FROM gradle:jdk11 as builder
#
#ENV APP_HOME=/home/app/
#WORKDIR $APP_HOME
#COPY build.gradle settings.gradle gradlew $APP_HOME
#COPY gradle $APP_HOME/gradle
#COPY . .
#RUN gradle build -x test
#
## Stage 2 - Create a downsized production container
#FROM openjdk:11 as deploy
#
#RUN groupadd --system --gid 1000 deploy
#RUN useradd --system --gid deploy --uid 1000 --shell /bin/bash --create-home deploy
#USER deploy
#WORKDIR /home/app/
#COPY --from=builder /home/app/build/libs/api-*.jar /home/app/api.jar
#
#CMD ["java", "-Djava.security.egd=file:/dev/./urandom","-jar", "/home/app/api.jar"]

