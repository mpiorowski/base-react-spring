package base.api.rest.forum.categories.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryDataDto extends GenericResponseDto {

  private String categoryTitle;
  private String categoryDescription;
  private String categoryIcon;
  private int categoryAuthor;
}
