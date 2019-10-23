package base.api.rest.forum.categories.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryRespondDto extends GenericResponseDto {
  private String categoryTitle;
  private String categoryDescription;

  private Integer categoryTopicsNumber;
  private Integer categoryPostsNumber;

  private String categoryNewestPost;
  private String categoryNewestTopic;
  private String categoryNewestPostAuthor;
  private String categoryNewestPostDate;


}
