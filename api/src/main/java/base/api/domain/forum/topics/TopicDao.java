package base.api.domain.forum.topics;

import base.api.domain.generic.GenericDao;
import base.api.domain.generic.ResponseDao;
import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@Mapper
public interface TopicDao extends GenericDao<TopicEntity> {

  @Select("update forum_topics set topic_views = topic_views + 1 where topic_id = #{topicId}")
  void increaseTopicView(@Param("topicId") int topicId);

  default List<TopicEntity> findAll() {
    return findAll(TopicDao.Table.NAME);
  }

  @Select({"select * from forum_topics where uid = #{uid}"})
  @Results({
    @Result(
        property = "topicAuthor",
        column = "fk_user_id",
        javaType = UserEntity.class,
        one = @One(select = "selectUser"))
  })
  Optional<TopicEntity> findByUid1(UUID uid);

//  default Optional<TopicEntity> findByUid(UUID uid) {
//    return findByUid(TopicDao.Table.NAME, uid);
//  }

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

  @Override
  @Select({
    "insert into forum_topics (topic_title, topic_description, fk_category_id, fk_user_id) ",
    "values (#{topicTitle}, #{topicDescription}, #{topicCategory}, #{topicAuthor.id}) ",
    "returning id, uid"
  })
  ResponseDao add(TopicEntity entity);

  @Override
  @Select({
    "update forum_topics set",
    "topic_title = #{topicTitle},",
    "topic_description = #{topicDescription}",
    "where uid = #{uid} and is_deleted is false",
    "returning *"
  })
  ResponseDao edit(TopicEntity entity);

  @Select({
    "update forum_topics ft set",
    "topic_title = #{topicTitle},",
    "topic_description = #{topicDescription}",
    "from sys_users su where su.id = ft.fk_user_id",
    "and ft.uid = #{uid} and ft.is_deleted is false",
    "returning *"
  })
  @Results({
    @Result(property = "topicAuthor.userName", column = "user_name"),
    @Result(property = "topicAuthor.userEmail", column = "user_email")
  })
  Optional<TopicEntity> edit1(TopicEntity entity);

  @Override
  @Delete("update forum_topics set is_deleted = true where uid = #{uid}")
  int delete(UUID uid);

  @Update("update forum_topics set active = not active where uid = #{uid} and is_deleted is false")
  int changeStatus(UUID uid);

  class Table {
    private static final String NAME = "forum_topics";

    private Table() {}
  }
}
