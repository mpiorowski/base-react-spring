package base.api.services.forum;

import base.api.domain.forum.categories.CategoryDao;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.categories.CategoryNewestEntity;
import base.api.domain.generic.ResponseDao;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
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
    ResponseDao responseDao = dao.add(entity);
    return UtilsStringConversions.uidEncode(responseDao.getUid());
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

  public Integer countPostsById(Integer id) {
    return dao.countPostsById(id);
  }

  public Integer countTopicsById(Integer id) {
    return dao.countTopicsById(id);
  }

  public Optional<CategoryNewestEntity> findNewestById(Integer id) {
    return dao.findNewestById(id);
  }
}
