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
  @Select(
      "insert into forum_posts (post_content, reply_uid, fk_topic_id, fk_user_id) "
          + "values "
          + "(#{postContent}, #{replyUid}, #{topicId}, #{postAuthor.id}) "
          + "returning id, uid")
  Optional<PostEntity> add(PostEntity entity);

  @Override
  @Select({
    "update forum_posts set",
    "post_content = #{postContent}",
    "where uid = #{uid} and fk_user_id = #{postAuthor.id} and is_deleted is false",
    "returning id, uid"
  })
  Optional<PostEntity> edit(PostEntity entity);

  @Override
  @Delete("update forum_posts set is_deleted = true where uid = #{uid}")
  int delete(UUID uid);

  @Update("update forum_posts set active = not active where uid = #{uid} and is_deleted is false")
  int changeStatus(UUID uid);

  class Table {
    private static final String NAME = "forum_posts";

    private Table() {}
  }
}
