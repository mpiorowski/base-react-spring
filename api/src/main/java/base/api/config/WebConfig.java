package base.api.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);
  private final AppConfig appConfig;
  public WebConfig(AppConfig appConfig) {
    this.appConfig = appConfig;
  }

  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = appConfig.getCors();
    if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
      logger.debug("Registering CORS filter");
      source.registerCorsConfiguration("/api/**", config);
      source.registerCorsConfiguration("/management/**", config);
    }
    return new CorsFilter(source);
  }
}
