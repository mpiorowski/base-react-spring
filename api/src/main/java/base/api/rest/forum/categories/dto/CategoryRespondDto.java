package base.api.rest.forum.categories.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryRespondDto extends GenericResponseDto {
  private String categoryTitle;
  private String categoryDescription;
}
