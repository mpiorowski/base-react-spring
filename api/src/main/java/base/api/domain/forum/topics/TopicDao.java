package base.api.domain.forum.topics;

import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@Mapper
public interface TopicDao extends GenericDao<TopicEntity> {

  @Select("update forum_topics set topic_views = topic_views + 1 where topic_id = #{topicId}")
  void increaseTopicView(@Param("topicId") int topicId);

  @Override
  @Select({"select * from", Table.NAME, "where is_deleted is false"})
  List<TopicEntity> findAll();

  @Override
  @Select({
    "select ft.*, su.user_name as userName, su.user_email as userEmail, su.uid as userUid from",
    Table.NAME,
    "as ft",
    "join sys_users su on ft.fk_user_id = su.id",
    "where ft.is_deleted is false and ft.uid = #{uid}"
  })
  @Results({
    @Result(property = "topicCategory", column = "fk_category_id"),
    @Result(property = "topicAuthor.uid", column = "userUid"),
    @Result(property = "topicAuthor.userName", column = "userName"),
    @Result(property = "topicAuthor.userEmail", column = "userEmail"),
  })
  Optional<TopicEntity> findByUid(UUID uid);

  @Override
  @Select({"insert into", Table.NAME, Table.INSERT, "returning *"})
  @Results({
    @Result(property = "topicAuthor.id", column = "fk_user_id"),
  })
  Optional<TopicEntity> add(TopicEntity entity);

  @Override
  @Select({
    "update forum_topics",
    Table.UPDATE,
    "where uid = #{uid} and is_deleted is false",
    "returning *"
  })
  @Results({
    @Result(property = "topicAuthor.id", column = "fk_user_id"),
  })
  Optional<TopicEntity> edit(TopicEntity entity);

  @Override
  @Delete("update forum_topics set is_deleted = true where uid = #{uid}")
  int delete(UUID uid);

  @Select(
      "select * from forum_topics where fk_category_id = #{id} and is_deleted is false order by created_at desc")
  List<TopicEntity> findTopicsByCategoryId(Integer id);

  @Select({
    "select ft.*, fp.uid as latestPostUid, fp.created_at as latestPostDate from forum_topics ft",
    "left join forum_posts fp on ft.id = fp.fk_topic_id",
    "and fp.created_at = (select max(created_at) from forum_posts fp2 where fp2.fk_topic_id = ft.id)",
    "where ft.fk_category_id = #{id}",
    "order by fp.created_at desc"
  })
  List<TopicWithPostsEntity> findTopicsWithPostsByCategoryId(Integer id);

  @Update("update forum_topics set active = not active where uid = #{uid} and is_deleted is false")
  int changeStatus(UUID uid);

  class Table {
    private static final String NAME = "forum_topics";
    private static final String COL1 = "topic_title";
    private static final String VAL1 = "#{topicTitle}";
    private static final String COL2 = "topic_description";
    private static final String VAL2 = "#{topicDescription}";
    private static final String COL3 = "fk_category_id";
    private static final String VAL3 = "#{topicCategory}";
    private static final String COL4 = "fk_user_id";
    private static final String VAL4 = "#{topicAuthor.id}";
    private static final String INSERT =
        "("
            + COL1
            + ","
            + COL2
            + ","
            + COL3
            + ","
            + COL4
            + ") values ("
            + VAL1
            + ","
            + VAL2
            + ","
            + VAL3
            + ","
            + VAL4
            + ")";
    private static final String UPDATE = "set " + COL1 + "=" + VAL1 + "," + COL2 + "=" + VAL2;

    private Table() {}
  }
}
