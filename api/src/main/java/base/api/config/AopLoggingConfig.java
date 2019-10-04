package base.api.config;

import base.api.logging.AopLogging;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

@Configuration
@EnableAspectJAutoProxy
public class AopLoggingConfig {

  @Bean
  @Profile(AppConstants.Profiles.SPRING_PROFILE_DEVELOPMENT)
  public AopLogging loggingAspect(Environment env) {
    return new AopLogging(env);
  }
}
