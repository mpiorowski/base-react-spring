package base.api.domain.forum.posts;

import base.api.domain.forum.NewestEntity;
import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Component
public interface PostDao extends GenericDao<PostEntity> {

  @Override
  @Select({"select * from", Table.NAME, "where is_deleted is false"})
  List<PostEntity> findAll();

  @Override
  @Select({"select * from", Table.NAME, "where is_deleted is false and uid = #{uid}"})
  Optional<PostEntity> findByUid(UUID uid);

  @Select("select count(*) from forum_posts where fk_topic_id = #{topicId}")
  int countPostsByTopicId(@Param("topicId") int topicId);

  @Select({
    "select * from forum_posts fp",
    "join sys_users su on fk_user_id = su.id",
    "where fk_topic_id = #{topicId}",
    "and fp.is_deleted is false",
    "order by fp.created_at asc"
  })
  @Results({
    @Result(property = "postAuthor.userName", column = "user_name"),
    @Result(property = "postAuthor.userEmail", column = "user_email"),
  })
  List<PostEntity> findPostsByTopicId(int topicId);

  @Select({
    "select created_at as newestDate, uid as newestUid from forum_posts",
    "where fk_topic_id = #{id} and is_deleted is false",
    "order by created_at desc limit 1"
  })
  Optional<NewestEntity> findNewestByTopicId(Integer id);

  @Override
  @Select({"insert into", Table.NAME, Table.INSERT, "returning *"})
  @Results({
    @Result(property = "postAuthor.id", column = "fk_user_id"),
  })
  Optional<PostEntity> add(PostEntity entity);

  @Override
  @Select({
    "update forum_posts",
    Table.UPDATE,
    "where uid = #{uid} and fk_user_id = #{postAuthor.id} and is_deleted is false",
    "returning *"
  })
  @Results({
    @Result(property = "postAuthor.id", column = "fk_user_id"),
  })
  Optional<PostEntity> edit(PostEntity entity);

  @Override
  @Delete("update forum_posts set is_deleted = true where uid = #{uid}")
  int delete(UUID uid);

  @Update("update forum_posts set active = not active where uid = #{uid} and is_deleted is false")
  int changeStatus(UUID uid);

  class Table {
    private static final String NAME = "forum_posts";

    private static final String COL1 = "post_content";
    private static final String VAL1 = "#{postContent}";
    private static final String COL2 = "reply_uid";
    private static final String VAL2 = "#{replyUid}";
    private static final String COL3 = "fk_topic_id";
    private static final String VAL3 = "#{topicId}";
    private static final String COL4 = "fk_user_id";
    private static final String VAL4 = "#{postAuthor.id}";
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
    private static final String UPDATE = "set " + COL1 + "=" + VAL1;

    private Table() {}
  }
}
