package base.api.domain.forum.categories;

import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Mapper
public interface CategoryDao extends GenericDao<CategoryEntity> {

  @Override
  @Select({"select * from", Table.NAME, "where is_deleted is false", "order by created_at asc"})
  List<CategoryEntity> findAll();

  @Override
  @Select({"select * from", Table.NAME, "where is_deleted is false and uid = #{uid}"})
  Optional<CategoryEntity> findByUid(UUID uid);

  @Override
  @Select({"insert into", Table.NAME, Table.INSERT, "returning *"})
  Optional<CategoryEntity> add(CategoryEntity entity);

  @Override
  @Select({
    "update",
    Table.NAME,
    Table.UPDATE,
    "where uid = #{uid} and is_deleted is false",
    "returning *"
  })
  Optional<CategoryEntity> edit(CategoryEntity entity);

  @Override
  @Delete({"update " + Table.NAME + " set is_deleted = true where uid = #{uid}"})
  int delete(@Param("uid") UUID uid);

  @Select({
    "select",
    "ft.uid as categoryLatestTopicUid,",
    "ft.topic_title as categoryLatestTopic,",
    "fp.uid as categoryLatestPostUid,",
    "fp.post_content as categoryLatestPost,",
    "su.user_name as categoryLatestPostAuthor,",
    "fp.created_at as categoryLatestPostDate",
    "from forum_posts fp join forum_topics ft on fp.fk_topic_id = ft.id join sys_users su on fp.fk_user_id = su.id",
    "where fk_topic_id in (select id from forum_topics where fk_category_id = #{id})",
    "order by fp.created_at desc limit 1"
  })
  Optional<CategoryLatestEntity> findLatestById(Integer id);

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
    private static final String COL1 = "category_title";
    private static final String VAL1 = "#{categoryTitle}";
    private static final String COL2 = "category_description";
    private static final String VAL2 = "#{categoryDescription}";
    private static final String COL3 = "fk_user_id";
    private static final String VAL3 = "#{categoryAuthor.id}";
    private static final String COL4 = "category_icon";
    private static final String VAL4 = "#{categoryIcon}";

    private static final String INSERT =
        "(" + COL1 + "," + COL2 + "," + COL3 + "," + COL4 + ") values (" + VAL1 + "," + VAL2 + "," + VAL3 + "," + VAL4 + ")";

    private static final String UPDATE = "set " + COL1 + "=" + VAL1 + "," + COL2 + "=" + VAL2 + "," + COL4 + "=" + VAL4;

    private Table() {}
  }
}
