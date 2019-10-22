package base.api.services.forum;

import base.api.domain.forum.topics.TopicDao;
import base.api.domain.forum.topics.TopicEntity;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TopicService extends GenericService<TopicEntity> {

  private TopicDao dao;

  public TopicService(TopicDao dao) {
    this.dao = dao;
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

  public List<TopicEntity> findTopicsByCategoryId(long id) {
    return dao.findTopicsByCategoryId(id);
  }

  @Override
  public String add(TopicEntity entity) {
    UUID uuid = dao.add(entity);
    return UtilsStringConversions.uidEncode(uuid);
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
