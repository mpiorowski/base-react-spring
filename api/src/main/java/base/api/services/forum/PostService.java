package base.api.services.forum;

import base.api.domain.forum.NewestEntity;
import base.api.domain.forum.posts.PostDao;
import base.api.domain.forum.posts.PostEntity;
import base.api.domain.generic.ResponseDao;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsUid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostService extends GenericService<PostEntity> {

  private PostDao dao;

  public PostService(PostDao dao) {
    this.dao = dao;
  }

  public int countPostsByTopicId(long topicId) {
    return dao.countPostsByTopicId(topicId);
  }

  @Override
  public List<PostEntity> findAll() {
    return dao.findAll();
  }

  @Override
  public Optional<PostEntity> findByUid(String uid) {

    return dao.findByUid(UtilsUid.uidDecode(uid));
  }

  public List<PostEntity> findPostsByTopicId(long id) {

    return dao.findPostsByTopicId(id);
  }

  public Optional<NewestEntity> findNewestByTopicId(Integer id) {
    return dao.findNewestByTopicId(id);
  }

  @Override
  public Optional<PostEntity> add(PostEntity entity) {
    entity.setPostAuthor(currentUserEntity());
    return dao.add(entity);
  }

  //TODO - validate user
  @Override
  public Optional<PostEntity> edit(PostEntity entity) {
    entity.setPostAuthor(currentUserEntity());
    return dao.edit(entity);
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
