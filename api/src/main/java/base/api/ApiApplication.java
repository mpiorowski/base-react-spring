package base.api;

import base.api.config.AppConstants;
import io.micrometer.core.instrument.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@SpringBootApplication
public class ApiApplication {

  private static final Logger logger = LoggerFactory.getLogger(ApiApplication.class);

  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(ApiApplication.class);

    Map<String, Object> defProperties = new HashMap<>();
    defProperties.put(
        AppConstants.Profiles.SPRING_PROFILE_DEFAULT,
        AppConstants.Profiles.SPRING_PROFILE_DEVELOPMENT);

    app.setDefaultProperties(defProperties);
    Environment env = app.run(args).getEnvironment();
    logApplicationStartup(env);
  }

  private static void logApplicationStartup(Environment env) {
    String protocol = "http";
    if (env.getProperty("server.ssl.key-store") != null) {
      protocol = "https";
    }
    String serverPort = env.getProperty("server.port");
    String contextPath = env.getProperty("server.servlet.context-path");
    if (StringUtils.isBlank(contextPath)) {
      contextPath = "/";
    }
    String hostAddress = "localhost";
    try {
      hostAddress = InetAddress.getLocalHost().getHostAddress();
    } catch (UnknownHostException e) {
      logger.warn("The host name could not be determined, using `localhost` as fallback");
    }
    String[] profiles;
    if (env.getActiveProfiles().length != 0) {
      profiles = env.getActiveProfiles();
    } else {
      profiles = env.getDefaultProfiles();
    }
    logger.info(
        "\n----------------------------------------------------------\n\t"
            + "Application '{}' is running! Access URLs:\n\t"
            + "Local: \t\t{}://localhost:{}{}\n\t"
            + "External: \t{}://{}:{}{}\n\t"
            + "Profile(s): \t{}\n"
            + "----------------------------------------------------------\n"
            + "Time is \t: {}\n"
            + "Instant is \t: {}\n"
            + "----------------------------------------------------------\n",
        env.getProperty("spring.application.name"),
        protocol,
        serverPort,
        contextPath,
        protocol,
        hostAddress,
        serverPort,
        contextPath,
        profiles,
        LocalDateTime.now(),
        Instant.now());
  }

  @PostConstruct
  void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }
}
