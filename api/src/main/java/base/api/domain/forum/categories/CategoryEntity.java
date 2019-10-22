package base.api.domain.forum.categories;

import base.api.domain.generic.GenericEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryEntity extends GenericEntity {

  private String categoryTitle;
  private String categoryDescription;
}
