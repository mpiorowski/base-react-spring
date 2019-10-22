package base.api.services.forum;

import base.api.domain.forum.categories.CategoryDao;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService extends GenericService<CategoryEntity> {

  private CategoryDao dao;

  public CategoryService(CategoryDao dao) {
    this.dao = dao;
  }

  @Override
  public List<CategoryEntity> findAll() {
    return dao.findAll();
  }

  @Override
  public Optional<CategoryEntity> findByUid(String huid) {
    UUID uid = UtilsStringConversions.uidDecode(huid);
    return dao.findByUid(uid);
  }

  @Override
  public String add(CategoryEntity entity) {
    UUID uuid = dao.add(entity);
    return UtilsStringConversions.uidEncode(uuid);
  }

  @Override
  public boolean edit(CategoryEntity entity) {
    return dao.edit(entity) == 1;
  }

  @Override
  public boolean delete(String uid) {
    UUID uuid = UtilsStringConversions.uidDecode(uid);
    return dao.delete(uuid) == 1;
  }

  public void findAdditionalById(Long id) {
//    select fk_topic_id, post_content, created_at from forum_posts where fk_topic_id in (select id from forum_topics where fk_category_id = 1) order by created_at desc limit 1;
  }
}
