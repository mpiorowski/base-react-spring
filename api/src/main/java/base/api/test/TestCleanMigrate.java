package base.api.test;

import org.flywaydb.core.Flyway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestCleanMigrate {

  private Flyway flyway;

  public TestCleanMigrate(Flyway flyway) {
    this.flyway = flyway;
  }

  @GetMapping("/clean")
  public void cleanDatabase() {
    flyway.clean();
    flyway.migrate();
  }
}
