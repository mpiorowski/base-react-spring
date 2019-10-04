package base.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "storage")
public class StorageConfig {

  /** Folder location for storing files */
  private static String location = "./files/";

  public static String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    StorageConfig.location = location;
  }
}
