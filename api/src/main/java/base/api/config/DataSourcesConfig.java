package base.api.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ConfigurationProperties(prefix = "datasources", ignoreUnknownFields = false)
@Getter
public class DataSourcesConfig {

  private final Database database = new Database();

  @Data
  private static class Database {
    private String username;
    private String password;
    private int port;
    private String schema;
    private String host;
  }

  @Bean
  public DataSource getDataSource() {
    DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.driverClassName("org.postgresql.Driver");
    dataSourceBuilder.url(
        "jdbc:postgresql://" +  database.getHost() + ":" + database.getPort() + "/" + database.getSchema());
    dataSourceBuilder.username(database.getUsername());
    dataSourceBuilder.password(database.getPassword());
    return dataSourceBuilder.build();
  }

  //  @Autowired
  //  @Bean(name = "flyway")
  //  public Flyway getFlywayBean(@Qualifier("dataSource") DataSource dataSource, AppConfig
  // appConfig) {
  //    FluentConfiguration configuration = Flyway.configure()
  //        .table("schema_version")
  //        .outOfOrder(true)
  //        .schemas("public")
  //        .dataSource(dataSource)
  //        .locations("db/migration")
  //        .baselineOnMigrate(true)
  //        .ignoreMissingMigrations(true);
  //
  //    Flyway bean = new Flyway(configuration);
  //    bean.repair();
  //    if (true){
  //      bean.migrate();
  //    }
  //    return bean;
  //  }
}
