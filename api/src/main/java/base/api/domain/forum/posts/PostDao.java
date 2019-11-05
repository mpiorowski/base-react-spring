package base.api.domain.forum.posts;

import base.api.domain.forum.NewestEntity;
import base.api.domain.generic.GenericDao;
import base.api.domain.generic.ResponseDao;
import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Component
public interface PostDao extends GenericDao<PostEntity> {

  default List<PostEntity> findAll() {
    return findAll(PostDao.Table.NAME);
  }

  default Optional<PostEntity> findByUid(UUID uid) {
    return findByUid(PostDao.Table.NAME, uid);
  }

  @Select("select count(*) from forum_posts where fk_topic_id = #{topicId}")
  int countPostsByTopicId(@Param("topicId") long topicId);

  @Select("SELECT * from sys_users where id = #{id} and is_deleted is false")
  UserEntity selectUser(Long id);

  @Select(
      "select * from forum_posts fp "
          + "join sys_users su on fk_user_id = su.id "
          + "where fk_topic_id = #{topicId} "
          + "and fp.is_deleted is false "
          + "order by fp.created_at asc")
  @Results({
    @Result(property = "postAuthor.userName", column = "user_name"),
    @Result(property = "postAuthor.userEmail", column = "user_email")
  })
  List<PostEntity> findPostsByTopicId(long topicId);

  @Select({
    "select created_at as newestDate, uid as newestUid from forum_posts",
    "where fk_topic_id = #{id} and is_deleted is false",
    "order by created_at desc limit 1"
  })
  Optional<NewestEntity> findNewestByTopicId(Integer id);

  @Override
  @Select(
      "insert into forum_posts (post_content, reply_id, fk_topic_id, fk_user_id) "
          + "values "
          + "(#{postContent}, #{replyId}, #{topicId}, #{postAuthor.id}) "
          + "returning id, uid")
  ResponseDao add(PostEntity entity);

  @Override
  @Update(
      "update forum_posts set post_content = #{postContent} where uid = #{uid} and fk_user_id = #{postAuthor.id} and is_deleted is false")
  int edit(PostEntity entity);

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
