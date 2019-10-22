package base.api.domain.forum.categories;

import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Mapper
public interface CategoryDao extends GenericDao<CategoryEntity> {
  default List<CategoryEntity> findAll() {
    return findAll(Table.NAME);
  }

  default Optional<CategoryEntity> findByUid(UUID uid) {
    return findByUid(Table.NAME, uid);
  }

  @Override
  @Select({
    "insert into",
    Table.NAME,
    "(category_title, category_description, fk_user_id)",
    "values",
    "(#{categoryTitle}, #{categoryDescription}, 1)",
    "returning uid"
  })
  UUID add(CategoryEntity entity);

  @Override
  @Update({
    "update",
    Table.NAME,
    "set category_title = #{categoryTitle},",
    "category_description = #{categoryDescription},",
    "fk_user_id = 1",
    "where uid = #{uid} and deleted is false"
  })
  int edit(CategoryEntity entity);

  @Override
  @Delete({"update " + Table.NAME + " set deleted = true where uid = #{uid}"})
  int delete(@Param("uid") UUID uid);

  class Table {
    private static final String NAME = "forum_categories";

    private Table() {}
  }
}
