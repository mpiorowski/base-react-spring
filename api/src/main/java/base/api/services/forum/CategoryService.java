package base.api.services.forum;

import base.api.domain.forum.categories.CategoryDao;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.categories.CategoryLatestEntity;
import base.api.rest.forum.categories.CategoryMapper;
import base.api.rest.forum.categories.dto.CategoryRespondDto;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsUid;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService extends GenericService<CategoryEntity> {

  private CategoryDao dao;
  private CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);

  public CategoryService(CategoryDao dao) {
    this.dao = dao;
  }

  @Override
  public List<CategoryEntity> findAll() {
    return dao.findAll();
  }

  @Override
  public Optional<CategoryEntity> findByUid(String uid) {
    return dao.findByUid(UtilsUid.uidDecode(uid));
  }

  @Override
  public Optional<CategoryEntity> add(CategoryEntity entity) {
    entity.setCategoryAuthor(currentUserEntity());
    return dao.add(entity);
  }

  @Override
  public Optional<CategoryEntity> edit(CategoryEntity entity) {
    return dao.edit(entity);
  }

  @Override
  public boolean delete(String uid) {
    UUID uuid = UtilsUid.uidDecode(uid);
    return dao.delete(uuid) == 1;
  }

  public CategoryRespondDto setAdditionalData(CategoryEntity categoryEntity) {

    var id = categoryEntity.getId();
    var categoryLatestEntity = findLatestById(id);

    CategoryRespondDto categoryRespondDto;
    if (categoryLatestEntity.isPresent()) {
      categoryRespondDto =
          categoryMapper.entityWithLatestToDto(categoryEntity, categoryLatestEntity.get());
    } else {
      categoryRespondDto = categoryMapper.entityToRespondDto(categoryEntity);
    }
    categoryRespondDto.setCategoryTopicsNumber(countTopicsById(id));
    categoryRespondDto.setCategoryPostsNumber(countPostsById(id));
    return categoryRespondDto;
  }

  private Integer countPostsById(Integer id) {
    return dao.countPostsById(id);
  }

  private Integer countTopicsById(Integer id) {
    return dao.countTopicsById(id);
  }

  private Optional<CategoryLatestEntity> findLatestById(Integer id) {
    return dao.findLatestById(id);
  }
}
