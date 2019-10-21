package base.api.services.forum;

import base.api.domain.forum.CategoryDao;
import base.api.domain.forum.CategoryEntity;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService extends GenericService<CategoryEntity> {

  @Autowired
  private CategoryDao dao;
  @Autowired
  public CategoryService(CategoryDao dao) {
    this.dao = dao;
  }

  @Override
  public List<CategoryEntity> findAll() {
    return dao.findAll();
  }

//  @Override
//  public Optional<CategoryEntity> findByUid(String uid) {
//    UUID uuid = UtilsStringConversions.uidDecode(uid);
//    return dao.findByUid(uuid);
//  }
//
//  @Override
//  public String add(CategoryEntity entity) {
//    UUID uid = dao.add(entity);
//    return UtilsStringConversions.uidEncode(uid);
//  }
//
//  @Override
//  public boolean edit(CategoryEntity entity) {
//    return dao.edit(entity) == 1;
//  }
//
//  @Override
//  public boolean delete(String uid) {
//    UUID uuid = UtilsStringConversions.uidDecode(uid);
//    return dao.delete(uuid) == 1;
//  }
}
