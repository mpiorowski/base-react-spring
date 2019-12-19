package base.api.test;

import base.api.domain.forum.categories.CategoryDao;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.user.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RequestMapping("/api/test/cat")
@RestController
public class TestRest {

  private static final Logger logger = LoggerFactory.getLogger(TestRest.class);
  private final CategoryDao categoryDao;

  public TestRest(CategoryDao categoryDao) {
    this.categoryDao = categoryDao;
  }

  @GetMapping
  public void test() {
//    Optional<CategoryDao.Relation> pair = categoryDao.findById(1);
//    logger.info(pair.get().toString());
//    logger.info(pair.get().getUserEntity().toString());
  }
}
