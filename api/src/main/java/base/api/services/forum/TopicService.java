package base.api.services.forum;

import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.topics.TopicDao;
import base.api.domain.forum.topics.TopicEntity;
import base.api.domain.forum.topics.TopicWithPostsEntity;
import base.api.domain.user.UserEntity;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsUid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TopicService extends GenericService<TopicEntity> {

  private TopicDao dao;
  private PostService postService;

  public TopicService(TopicDao dao, PostService postService) {
    this.dao = dao;
    this.postService = postService;
  }

  @Override
  public List<TopicEntity> findAll() {
    return null;
  }

  @Override
  public Optional<TopicEntity> findByUid(String uid) {
    UUID uuid = UtilsUid.uidDecode(uid);
    return dao.findByUid(uuid);
  }

  public List<TopicWithPostsEntity> findTopicsWithPostsByCategoryId(Integer id) {
    return dao.findTopicsWithPostsByCategoryId(id);
  }

  @Override
  public Optional<TopicEntity> add(TopicEntity topicEntity) {
    topicEntity.setTopicAuthor(currentUserEntity());
    Optional<TopicEntity> addEntity = dao.add(topicEntity);
    addEntity.ifPresent(
      entity -> {
        UserEntity userEntity = dao.selectUser(entity.getTopicAuthor().getId());
        entity.setTopicAuthor(userEntity);
      }
    );
    return addEntity;
  }

  // TODO - validate user
  @Override
  public Optional<TopicEntity> edit(TopicEntity topicEntity) {
    Optional<TopicEntity> editEntity = dao.edit(topicEntity);
    editEntity.ifPresent(
      entity -> {
        UserEntity userEntity = dao.selectUser(entity.getTopicAuthor().getId());
        entity.setTopicAuthor(userEntity);
      }
    );
    return editEntity;
  }

  @Override
  public boolean delete(String uid) {
    UUID uuid = UtilsUid.uidDecode(uid);
    return dao.delete(uuid) == 1;
  }

  public boolean changeStatus(String uid) {

    UUID uuid = UtilsUid.uidDecode(uid);
    return dao.changeStatus(uuid) == 1;
  }
}
