package base.api.rest.forum.categories.dto;

import lombok.Data;

@Data
public class CategoryRequestDto {
  private String uid;
  private String categoryTitle;
  private String categoryDescription;
}
