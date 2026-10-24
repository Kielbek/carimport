# Production image of the API: build with Maven, run on a slim JRE as a non-root user.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -B -ntp dependency:go-offline
COPY src src
RUN mvn -B -ntp package -DskipTests

FROM eclipse-temurin:21-jre
RUN useradd --system --uid 10001 app && mkdir -p /data/reports && chown app /data/reports
WORKDIR /app
COPY --from=build /src/target/carimport-backend-*.jar app.jar
USER app
ENV REPORT_STORAGE_DIR=/data/reports \
    JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
