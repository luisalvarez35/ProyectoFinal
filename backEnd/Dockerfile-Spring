FROM maven:3.6.1-jdk-11-slim AS build
WORKDIR /home
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:11
COPY --from=build "home/app/target/GestionApp.jar" "app.jar"
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]