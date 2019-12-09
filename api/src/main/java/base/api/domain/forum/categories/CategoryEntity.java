package base.api.domain.forum.categories;

import base.api.domain.generic.GenericEntity;
import base.api.domain.user.UserEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryEntity extends GenericEntity {

  private String categoryTitle;
  private String categoryDescription;
  private String categoryIcon;
  private UserEntity categoryAuthor;
}
