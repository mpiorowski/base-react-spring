package base.api.domain.forum;

import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CategoryDao extends GenericDao<CategoryEntity> {
  default List<CategoryEntity> findAll() {
    return findAll(Table.NAME);
  }

  class Table {
    private static final String NAME = "forum_categories";

    private Table() {}
  }
}
