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

  @Select({
    "select",
    "ft.topic_title as categoryNewestTopic,",
    "fp.post_content as categoryNewestPost,",
    "su.user_name as categoryNewestPostAuthor,",
    "fp.created_at as categoryNewestPostDate",
    "from forum_posts fp join forum_topics ft on fp.fk_topic_id = ft.id join sys_users su on fp.fk_user_id = su.id",
    "where fk_topic_id in (select id from forum_topics where fk_category_id = #{id})",
    "order by fp.created_at desc limit 1"
  })
  Optional<CategoryNewestEntity> findNewestById(Integer id);

  @Select({
    "select count(1)",
    "from forum_posts",
    "where fk_topic_id in (select id from forum_topics where fk_category_id = #{id})",
    "and is_deleted is false"
  })
  Integer countPostsById(Integer id);

  @Select({
    "select count(1)",
    "from forum_topics",
    "where fk_category_id = #{id}",
    "and is_deleted is false"
  })
  Integer countTopicsById(Integer id);

  class Table {
    private static final String NAME = "forum_categories";

    private Table() {}
  }
}
