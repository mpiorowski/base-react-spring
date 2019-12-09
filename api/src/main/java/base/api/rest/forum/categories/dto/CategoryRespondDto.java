package base.api.rest.forum.categories.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CategoryRespondDto extends GenericResponseDto {
  private String categoryTitle;
  private String categoryDescription;
  private String categoryIcon;

  private Integer categoryTopicsNumber;
  private Integer categoryPostsNumber;

  private String categoryLatestPostUid;
  private String categoryLatestTopic;
  private String categoryLatestTopicUid;
  private String categoryLatestPostAuthor;
  private String categoryLatestPostDate;

}
