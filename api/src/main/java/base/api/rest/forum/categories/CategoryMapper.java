package base.api.rest.forum.categories;

import base.api.config.mapper.MappersConfig;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.categories.CategoryLatestEntity;
import base.api.rest.forum.categories.dto.CategoryAdditionalDto;
import base.api.rest.forum.categories.dto.CategoryDataDto;
import base.api.rest.forum.categories.dto.CategoryRequestDto;
import base.api.rest.forum.categories.dto.CategoryRespondDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface CategoryMapper {

  CategoryEntity dtoToEntity(CategoryRequestDto categoryRequestDto);

  CategoryDataDto entityToDataDto(CategoryEntity categoryEntity);

  CategoryAdditionalDto latestEntityDoAdditionalDto(CategoryLatestEntity categoryLatestEntity);

  @Mapping(source = "categoryEntity.uid", target = "uid")
  @Mapping(source = "categoryEntity.categoryTitle", target = "categoryTitle")
  @Mapping(source = "categoryEntity.categoryDescription", target = "categoryDescription")
  @Mapping(source = "categoryEntity.categoryIcon", target = "categoryIcon")
  @Mapping(source = "userEntity.userName", target = "categoryAuthor")
  @Mapping(source = "userEntity.uid", target = "categoryAuthorUid")
  CategoryDataDto entityWithUserToDataDto(CategoryEntity.UserRelation userRelation);
}
