package base.api.services.forum;

import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.topics.TopicDao;
import base.api.domain.forum.topics.TopicEntity;
import base.api.domain.generic.ResponseDao;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
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
    UUID uuid = UtilsStringConversions.uidDecode(uid);
    return dao.findByUid(uuid);
  }

  public List<TopicEntity> findTopicsByCategoryId(Integer id) {
    return dao.findTopicsByCategoryId(id);
  }

  @Override
  public String add(TopicEntity entity) {
    ResponseDao responseDao = dao.add(entity);
    return UtilsStringConversions.uidEncode(responseDao.getUid());
  }

  @Transactional
  public String add(CategoryEntity categoryEntity, TopicEntity topicEntity) {

    topicEntity.setTopicCategory(categoryEntity.getId());
    topicEntity.setTopicAuthor(currentUserEntity());
    ResponseDao responseDao = dao.add(topicEntity);

    return UtilsStringConversions.uidEncode(responseDao.getUid());
  }

  @Override
  public boolean edit(TopicEntity entity) {
    return dao.edit(entity) == 1;
  }

  @Override
  public boolean delete(String uid) {
    UUID uuid = UtilsStringConversions.uidDecode(uid);
    return dao.delete(uuid) == 1;
  }

  public boolean changeStatus(String uid) {

    UUID uuid = UtilsStringConversions.uidDecode(uid);
    return dao.changeStatus(uuid) == 1;
  }
}
