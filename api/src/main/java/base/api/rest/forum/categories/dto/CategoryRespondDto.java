package base.api.rest.forum.categories.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryRespondDto {

  private CategoryDataDto categoryDataDto;
  private CategoryAdditionalDto categoryAdditionalDto;
}
