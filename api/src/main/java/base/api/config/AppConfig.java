package base.api.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@ConfigurationProperties(prefix = "app", ignoreUnknownFields = false)
@Getter
public class AppConfig {

  private final CorsConfiguration cors = new CorsConfiguration();
  private final Authentication authentication = new Authentication();
  private final Async async = new Async();
  private final Scheduler scheduler = new Scheduler();

  @Data
  public static class Authentication {
    long jwtExpirationInMsRememberMe = 604800000;
    long jwtExpirationInMs = 3600000;
  }

  @Data
  public static class Async {
    int corePoolSize = 2;
    int maxPoolSize = 50;
    int queueCapacity = 10000;
    String threadNamePrefix = "Async-";
  }

  @Data
  public static class Scheduler {
    int corePoolSize = 2;
    String threadNamePrefix = "Scheduler-";
  }
}
