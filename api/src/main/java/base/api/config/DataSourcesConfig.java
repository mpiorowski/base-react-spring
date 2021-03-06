package base.api.config;

import lombok.Data;
import lombok.Getter;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.FluentConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ConfigurationProperties(prefix = "datasources", ignoreUnknownFields = false)
@Getter
public class DataSourcesConfig {

  private static final Logger logger = LoggerFactory.getLogger(DataSourcesConfig.class);

  private final Database database = new Database();
  private final Migration migration = new Migration();

  @Bean
  public DataSource getDataSource() {
    DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.driverClassName("org.postgresql.Driver");
    dataSourceBuilder.url(
        "jdbc:postgresql://"
            + database.getHost()
            + ":"
            + database.getPort()
            + "/"
            + database.getSchema());
    dataSourceBuilder.username(database.getUsername());
    dataSourceBuilder.password(database.getPassword());
    return dataSourceBuilder.build();
  }

  //  TODO - config flyway
  @Bean(name = "flyway")
  @Autowired
  public Flyway getFlywayBean(DataSource dataSource, AppConfig appConfig) {

    FluentConfiguration configuration =
        Flyway.configure()
            //            .table("schema_version")
            //            .outOfOrder(true)
            //            .schemas("public")
            .dataSource(dataSource)
            .cleanOnValidationError(migration.cleanOnValidationError)
            .locations(migration.getLocations());
    //            .baselineOnMigrate(true)
    //            .ignoreMissingMigrations(true);

    Flyway flyway = new Flyway(configuration);
    if (this.migration.cleanOnStart) {
      flyway.clean();
    }
    flyway.migrate();
    return flyway;
  }

  @Data
  private static class Migration {
    private String[] locations;
    private boolean cleanOnStart = false;
    private boolean cleanOnValidationError = false;
  }

  @Data
  private static class Database {
    private String username;
    private String password;
    private int port;
    private String schema;
    private String host;
  }
}
